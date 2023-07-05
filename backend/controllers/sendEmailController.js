const nodemailer = require("nodemailer");

// Nodemailer configuration
/* const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASSWORD,
  }, 
}); */

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.CTLEMAIL,
    pass: process.env.CTLEMAILPASSWORD,
  },
});

const quoteProduct = async (req, res, next) => {
  try {
    const { from, productName, description } = req.body;
    let file = null;
    if (req.files && req.files.image) {
      file = req.files.image;
    }

    let message = {
      from: process.env.CTLEMAIL,
      to: process.env.QTEMAIL,
      subject: `Quote New Products: ${productName}`,
      text: `
    This is: ${from},

    Please find the product for us: ${productName},

    Product Description: ${description}`,
    };

    if (file) {
      message.attachments = [
        {
          filename: file.name,
          content: file.data,
        },
      ];
    }
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
      from: process.env.CTLEMAIL,
      to: process.env.QTEMAIL,
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
    // 因为 后面可能要改动 base64data 所以要用 let，不能用 const
    let { from, managerEmail, totalPrice, description, base64data } = req.body;
    
    const base64prefix = 'data:application/pdf;base64,';
    if (base64data.startsWith(base64prefix)) {
      base64data = base64data.slice(base64prefix.length);
    }

    const message = {
      from: process.env.CTLEMAIL,
      to: `${managerEmail}`,
      subject: `My shopping cart of $${totalPrice}`,
      text: `
    The email is from: ${from},

    This is my current purchase of: $${totalPrice},
    
    Please find the more details in attached PDF.`,

      attachments: [
        {
          filename: 'Cart.pdf',
          content: Buffer.from(base64data, 'base64'),
          contentType: 'application/pdf'
        }
      ],
    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

const sendInvoice = async (req, res, next) => {
  try {
    // 因为 后面可能要改动 base64data 所以要用 let，不能用 const
    let { totalPrice, billingEmail, invoiceNumber, base64data, purchaseNumber } = req.body;
    
    const base64prefix = 'data:application/pdf;base64,';
    if (base64data.startsWith(base64prefix)) {
      base64data = base64data.slice(base64prefix.length);
    }

    const message = {
      from: process.env.CTLEMAIL,
      to: `${billingEmail}`,
      subject: `Invoice ${invoiceNumber} from CTL AUSTRALIA`,
      text: `
  Hi There,

  Please find the attached invoice for $${totalPrice}, with the INV#: ${invoiceNumber} corresponding to your P/O#: ${purchaseNumber}.
      
  If you have any inquiries, please do not hesitate to contact us at: accounts@ctlservices.com.au
      
  Kind Regards,
  The CTL Australia Team
    `,

      attachments: [
        {
          filename: 'Invoice.pdf',
          content: Buffer.from(base64data, 'base64'),
          contentType: 'application/pdf'
        }
      ],
    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};


const newOrderRemind = async (req, res, next) => {
  try {
    const { from, PO, price } = req.body;

    message = {
      from: process.env.CTLEMAIL,
      to: process.env.QTEMAIL,
      subject: `A new order has been placed by ${from}`,
      text: `${from} has just placed an order for $${price}, PO#: ${PO}

please check that <https://www.ctlservices.com.au/admin/orders>.`,
    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  quoteProduct,
  quotePrice,
  managementApproval,
  newOrderRemind,
  sendInvoice
};
