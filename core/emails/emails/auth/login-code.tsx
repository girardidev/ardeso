import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface LoginCodeEmailProps {
  validationCode: string;
}

const LoginCodeEmail = ({ validationCode }: LoginCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code</Preview>
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="bg-white mx-auto my-0 mb-16 p-5 pb-12">
          <Section className="px-12">
            <Heading as="h2" className="text-2xl font-bold text-center">
              Your Login Code
            </Heading>

            <Text className="text-gray-600 text-base leading-6 text-left">
              Enter the following code to log in to your account:
            </Text>

            <Text className="inline-block p-4 w-full bg-gray-200 rounded-md border border-gray-300 text-gray-800 text-3xl font-bold text-center">
              {validationCode}
            </Text>

            <Text className="text-gray-600 text-base leading-6 text-left">
              If you didn't request this code, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

LoginCodeEmail.PreviewProps = {
  validationCode: "999999",
};

export default LoginCodeEmail;
