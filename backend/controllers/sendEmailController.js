const nodemailer = require("nodemailer");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

/* const transporter = nodemailer.createTransport({
  host: 'mail.ctlservices.com.au',
  port: 465,
  secure: true, 
  auth: {
    user: 'no-reply@ctlservices.com.au',
    pass: 'CTLadmin007'
  },
}); */

const quoteProduct = async (req, res, next) => {
  try {
    const { from, productName, description } = req.body;
    let file = null;
    if (req.files && req.files.image) {
      file = req.files.image;
    }

    message = {
      from,
      to: process.env.EMAIL,
      subject: `Quote New Products: ${productName}`,
      text: `
    This is: ${from},

    Please find the product for us: ${productName},

    Prodcut Description: ${description}`,
      attachments: [
        {
          filename: file.name,
          content: file.data,
        },
      ],
    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

const quotePrice = async (req, res, next) => {
  try {
    const { from, productName, description } = req.body;

    message = {
      from,
      to: process.env.EMAIL,
      subject: `Quote Price: ${productName}`,
      text: `
    This is: ${from},

    I'm looking for: ${productName},

    Please find out the price for me: <${process.env.BASE_URL}${description}>`,

    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

const managementApproval = async (req, res, next) => {
  try {
    const { from, managerEmail, totalPrice, description } = req.body;

    message = {
      from,
      to: `${managerEmail}`,
      subject: `Please Approve a Purchase of $${totalPrice}`,
      text: `
    This is: ${from},

    Could you please approve a purchase of: $${totalPrice},

    This is the purchase detail:     
    ${description}`,

    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { quoteProduct, quotePrice, managementApproval };
