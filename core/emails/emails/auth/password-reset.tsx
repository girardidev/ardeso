import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetUrl: string;
  userEmail: string;
  expiresAt: string;
}

const PasswordResetEmail = ({
  resetUrl,
  userEmail,
  expiresAt,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="bg-white mx-auto my-0 mb-16 p-5 pb-12">
          <Section className="px-12">
            <Heading as="h2" className="text-2xl font-bold text-center">
              Password Reset Request
            </Heading>

            <Text className="text-gray-600 text-base leading-6 text-left">
              Hi there,
            </Text>

            <Text className="text-gray-600 text-base leading-6 text-left">
              We received a request to reset the password for your account (
              {userEmail}). Click the button below to reset your password:
            </Text>

            <Section className="text-center my-8">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white font-medium py-3 px-6 rounded-md text-base no-underline inline-block"
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-gray-600 text-base leading-6 text-left">
              This link will expire in {expiresAt} for security purposes.
            </Text>

            <Text className="text-gray-600 text-base leading-6 text-left">
              If you didn't request a password reset, you can safely ignore this
              email. Your password will remain unchanged.
            </Text>

            <Text className="text-gray-600 text-sm leading-5 text-left mt-8">
              If the button doesn't work, you can copy and paste this link into
              your browser:
            </Text>

            <Text className="text-blue-600 text-sm leading-5 text-left break-all">
              {resetUrl}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

PasswordResetEmail.PreviewProps = {
  resetUrl: "https://example.com/reset-password?token=abc123",
  userEmail: "user@example.com",
  expiresAt: "24 hours",
};

export default PasswordResetEmail;
