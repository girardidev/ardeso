import type { JSX } from "react";

export interface Email {
  from: string;
  to: string;
  subject: string;
  body: JSX.Element;
}

export interface EmailRepository {
  sendReactEmail(email: Email): Promise<void>;
}
