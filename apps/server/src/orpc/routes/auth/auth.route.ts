import { lazy } from "@orpc/server";
import { base } from "@/orpc/context";

export default base.prefix("/auth").router({
  forgotPassword: lazy(() => import("./auth-forgot-password.route")),
  getAuthCode: lazy(() => import("./auth-get-code.route")),
  getGoogleAuthUrl: lazy(() => import("./auth-get-google-url.route")),
  refreshToken: lazy(() => import("./auth-refresh.route")),
  resetPassword: lazy(() => import("./auth-reset-password.route")),
  signIn: lazy(() => import("./auth-signin.route")),
  signInWithCode: lazy(() => import("./auth-signin-with-code.route")),
  signInWithGoogleAuth: lazy(() => import("./auth-signin-with-google.route")),
  signUp: lazy(() => import("./auth-signup.route")),
});
