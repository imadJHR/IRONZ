type MailEnvironment = Record<string, string | undefined>;

export class CheckoutMailConfigurationError extends Error {}

export function getCheckoutMailConfig(env: MailEnvironment) {
  const user = env.EMAIL_USER?.trim();
  const pass = env.EMAIL_PASS;
  const recipient = env.EMAIL_TO?.trim();

  if (!user || !pass || !recipient) {
    throw new CheckoutMailConfigurationError("Missing checkout email configuration");
  }

  const host = env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(env.SMTP_PORT?.trim() || "465");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new CheckoutMailConfigurationError("Invalid SMTP port");
  }

  return {
    user,
    recipient,
    transport: {
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    },
  };
}
