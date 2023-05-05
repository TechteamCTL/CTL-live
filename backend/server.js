const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./config/db");
const Product = require("./models/ProductModel");

connectDB();

app.use("/api", apiRoutes);

// Handle errors
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* // Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Send email route
app.post("/api/sendemail", async (req, res, next) => {
  try {
    const { from, productName, description } = req.body;
    let file = null;
    if (req.files && req.files.image) {
      file = req.files.image;
    }

    // Create email message
    let message;
    if (file) {
      message = {
        from,
        to: process.env.EMAIL,
        subject: `Quote New Products: ${productName}`,
        text: `This is: ${from},
Please find the product for us: ${productName}.
Prodcut Description: ${description}`,
        attachments: [
          {
            filename: file.name,
            content: file.data,
          },
        ],
      };
    } else {
      message = {
        from,
        to: process.env.EMAIL,
        subject: `Quote Price: ${productName}`,
        text: `This is: ${from},
I'm looking for: ${productName}.
Please find out the price for me: ${description}`,
        attachments: [],
      };
    }
    

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
