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

const deliveryNotice = async (req, res, next) => {
  try {
    const { userEmail, purchaseNumber, trackLink } = req.body;

    message = {
      from: process.env.CTLEMAIL,
      to: userEmail,
      subject: `P0#:${purchaseNumber} has been shipped`,
      text: purchaseNumber,
      html: `
      <div style="margin:0;padding:0">
  <div style="background-color:#f1f2ed">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color:#f1f2ed"
    >
      <tbody>
        <tr>
          <td width="17">&nbsp;</td>
          <td valign="top" align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr>
                  <td valign="top" align="center">
                    <table
                      align="center"
                      width="594"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td width="17">&nbsp;</td>
                          <td width="560" valign="top" align="center">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="padding-top:10px"
                            >
                              <tbody>
                                <tr></tr>

                                <tr>
                                  <td width="100%" height="62">
                                    &nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td width="17">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td valign="top" align="center">
                    <table
                      align="center"
                      width="594"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="background-color:#ffffff"
                    >
                      <tbody>
                        <tr>
                          <td width="17">&nbsp;</td>
                          <td width="560" valign="top" align="center">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td width="100%" valign="top" align="center">
                                  <br />
                                      <img
                                        src="https://res.cloudinary.com/ctlaustralia/image/upload/v1684899049/CTL-blueDelivering_vxzmvk.png"
                                        align="center"
                                        border="0"
                                        width="500"
                                        height="100"
                                        alt="CTL Australia"
                                        style="outline:none;text-decoration:none;display:block;font-size:8px;line-height:100%"
                                        class="CToWUd"
                                        data-bit="iit"
                                      />
                                  </td>
                                </tr>

                                <tr>
                                  <td width="17">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="17">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="100%" valign="top" align="left">
                                    <div style="font-family:'Helvetica Light',Helvetica,Arial,sans-serif;font-size:14px;color:#000000;line-height:20px">
                                      <span style="font-size:14px;font-weight:normal;color:#000000">
                                        <b>
                                        <br />
                                        Your order for P/O#: ${purchaseNumber} has been shipped,
                                        <br />
                                        </b>
                                        <br />
                                        <br />
                                        Please click on the following button to track your shipping:
                                        <br />
                                        <br />
                                        <br />
                                        <a href="${trackLink}" style="padding:8px 15px; color: white; background: #1e4881; text-decoration:none;">Track Shipping</a>
                                        <br />
                                        <br />
                                        <br />
                                        If you have any other inquiries, please don't hesitate to contact
                                        <a
                                          href="mailto:sales@ctlservices.com.au"
                                          target="_blank"
                                        >
                                          sales@ctlservices.com.au
                                        </a>.
                                        <br />
                                        <br />
                                        <b>
                                            Thank you,
                                            <br />
                                            The CTL Australia Team
                                            <br />
                                            <br />
                                            <br />
                                        </b>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <font face="arial,helvetica,sans-serif" size="2">
      <hr>
        CAUTION: This <span class="il">email</span> and files included in its
        transmission are solely intended for the use of the addressee(s) and may
        contain information that is confidential and privileged. If you receive
        this <span class="il">email</span> in error, please advise us
        immediately and delete it without copying the contents contained within.
        CTL AUSTRALIA (including its group of companies) do not accept
        liability for the views expressed within or the consequences of any
        computer viruses that may be transmitted with this email. The contents are also subject to copyright. No part of it should be reproduced, adapted or transmitted
        without the written consent of the copyright owner.
      </hr>
    </font>
    <div class="yj6qo"></div>
  </div>
</div>;`,
    };

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
  sendInvoice,
  deliveryNotice
};
