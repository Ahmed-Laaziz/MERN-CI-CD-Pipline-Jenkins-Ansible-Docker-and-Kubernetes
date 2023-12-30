const nodemailer = require('nodemailer');

// Function to send an email
async function sendEmail(to, subject, text) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', 'Outlook', etc.
    auth: {
     user:"rh-ensaj@ucd.ac.ma",
<<<<<<< HEAD
     pass:"your app password"
=======
     pass:"your pass"
>>>>>>> 24cdcda7bdd1498b13184a54523afb52473158cd
    },
  });

  // Email message configuration
  const mailOptions = {
    from: 'rh-ensaj@ucd.ac.ma', // your email address
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
