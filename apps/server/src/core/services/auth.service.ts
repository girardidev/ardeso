import type {
  AuthCodesService,
  GoogleAuthService,
  NewUser,
  User,
  UserRepository,
} from "@/core";
import type { JWTService, PasswordService } from "@/shared";

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private jwtService: JWTService,
    private googleAuthService: GoogleAuthService,
    private authCodesService: AuthCodesService,
  ) {}

  async signIn(email: string, password: string): Promise<AuthTokens> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await this.passwordService.verify(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return this.generateTokens(user);
  }

  async signUp(userData: NewUser & { password: string }): Promise<AuthTokens> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordService.hash(userData.password);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error("Failed to create user");
    }

    return this.generateTokens(user);
  }

  async signInWithCode(email: string, code: string): Promise<AuthTokens> {
    // Verify code
    const isValidCode = await this.authCodesService.verifyCode(
      email,
      code,
      "email_verification",
    );
    if (!isValidCode) {
      throw new Error("Invalid verification code");
    }

    // Find or create user
    let user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Create user without password (will need to set password later)
      user = await this.userRepository.create({
        email,
        firstName: "",
        lastName: "",
        fullName: "",
      });

      if (!user) {
        throw new Error("Failed to create user");
      }
    }

    // Delete used code
    await this.authCodesService.deleteCode(email, "email_verification");

    return this.generateTokens(user);
  }

  async signInWithGoogle(
    code: string,
    redirectUri: string,
  ): Promise<AuthTokens> {
    // Verify Google token
    const googleUser = await this.googleAuthService.verifyToken(
      code,
      redirectUri,
    );

    // Find existing user or create new one
    let user = await this.userRepository.findByProviderId(
      "GOOGLE",
      googleUser.id,
    );
    if (!user) {
      // Try to find by email
      user = await this.userRepository.findByEmail(googleUser.email);
      if (user) {
        // Link Google account to existing user
        user = await this.userRepository.update(user.id, {
          provider: "GOOGLE",
          providerId: googleUser.id,
          avatar: googleUser.avatar,
        });
      } else {
        // Create new user
        user = await this.userRepository.create({
          email: googleUser.email,
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          fullName: googleUser.fullName,
          avatar: googleUser.avatar,
          provider: "GOOGLE",
          providerId: googleUser.id,
        });
      }
    }

    if (!user) {
      throw new Error("Failed to authenticate with Google");
    }

    return this.generateTokens(user);
  }

  getGoogleUrl(redirectUri: string): string {
    return this.googleAuthService.getAuthUrl(redirectUri);
  }

  async getCode(email: string): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    return await this.authCodesService.createCode(
      email,
      "email_verification",
      expiresAt,
    );
  }

  async forgotPassword(email: string, _redirectUri: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return "";
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes expiry

    const code = await this.authCodesService.createCode(
      email,
      "forgot_password",
      expiresAt,
    );
    return code;
  }

  async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<boolean> {
    // Verify code
    const isValidCode = await this.authCodesService.verifyCode(
      email,
      code,
      "forgot_password",
    );
    if (!isValidCode) {
      throw new Error("Invalid reset code");
    }

    // Find user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash new password
    const hashedPassword = await this.passwordService.hash(newPassword);

    // Update user password
    const updatedUser = await this.userRepository.update(user.id, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new Error("Failed to reset password");
    }

    // Delete used code
    await this.authCodesService.deleteCode(email, "forgot_password");

    return true;
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);

    if (!payload) {
      throw new Error("Invalid refresh token");
    }

    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new Error("User not found");
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: User): AuthTokens {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      token: this.jwtService.generateAccessToken(payload),
      refreshToken: this.jwtService.generateRefreshToken(payload),
    };
  }
}
