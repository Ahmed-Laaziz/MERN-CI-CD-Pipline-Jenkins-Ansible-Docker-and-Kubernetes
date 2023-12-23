const nodemailer = require('nodemailer');

// Function to send an email
async function sendEmail(to, subject, text) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', 'Outlook', etc.
    auth: {
     // your email address
      // your email password or app password (for Gmail)
    },
  });

  // Email message configuration
  const mailOptions = {
    from: 'laazizahmed72@gmail.com', // your email address
    to: to,
    subject: subject,
    text: text,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
