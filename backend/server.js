const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const axios = require('axios');

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


// Alph share stock

/* app.get('/api/stocks/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        console.log("symbol",symbol);
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=D4YL0UP08IB4WLBT`);
        res.json(response.data);
        console.log(response);
    } catch (error) {
        res.json({ message: error.message });
    }
}); */

app.get('/api/stocks/:symbol', async (req, res) => {
  const symbol = req.params.symbol
  const options = {
    method: 'GET',
    url: `https://yahoo-finance127.p.rapidapi.com/price/${symbol}`,
    headers: {
/*       'X-RapidAPI-Key': 'efdf69927emshe7e18900f6b05cfp1e4ce7jsnf94552526b27',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com' */
      'X-RapidAPI-Key': 'a6aff5b91bmshd4de738de54a38cp1ef98ejsn93ce112dba4c',
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data)
  } catch (error) {
    console.error(error);
  }
});

//https://metals-api.com/api/latest?access_key=g1kvvkzge5u9ncpvwu1qtlmc28pyruvp49wolsmlcuvkkk6046x01qf7q0ma&base=AUD&symbols=XAU,XAG
// XAU,XAG,XPT,XPD,IRON,ALU,LCO,XCU,LEAD,NI,TIN,ZNC

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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
