export const transporterSetup = () => {
  return {
    host: process.env.hostEmail,
    port: process.env.PORT_EMAIL,
    secure: true,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
};
export const mainOptionsSetup = (email, title, textContent) => {
  // create email content
  return {
    from: "Ceramic Manager",
    to: email,
    subject: title,
    text: textContent,
  };
};
