const MineralSharePrice = require("../models/MineralSharePricingModel");
const axios = require('axios');
const cron = require('node-cron');


const getMineralPrice = async (req, res, next) => {
  try {
    const mineralPrice = await MineralSharePrice.find({ category: 'Minerals' }).sort({ name: "asc" }).orFail();
    res.json(mineralPrice);
  } catch (error) {
    next(error);
  }
};


const adminCreatePrice = async (req, res, next) => {
  try {
    const {
      name,
      symbolsCode,
      category,
      latestPrice,
      updateDate,
      difference,
    } = req.body;
    if (
      !(
        name &&
        symbolsCode &&
        category &&
        latestPrice &&
        updateDate &&
        difference
      )
    ) {
      console.log("I am here");

      return res.status(400).send("All inputs are required");
    }

    const symbolExists = await MineralSharePrice.findOne({ symbolsCode });
    if (symbolExists) {
      return res.status(400).send("symbol exists");
    } else {
      const mineralSharePrice = await MineralSharePrice.create({
        name,
        symbolsCode,
        category,
        latestPrice,
        updateDate,
        difference,
      });
      res.status(201).send({ priceCreated: mineralSharePrice });
    }
  } catch (err) {
    next(err);
  }
};

const adminUpdateMineralsPrice = async (req, res, next) => {
  try {
    const response = await axios.get('https://metals-api.com/api/latest?access_key=8k681h1l6p7sh81nsl8ja22dj7914d7665putqbc7dnyupec7e1420no7w3q&base=AUD&symbols=XAU%2CXAG%2CXPT%2CXPD%2CIRON%2CALU%2CLCO%2CXCU%2CLEAD%2CNI%2CTIN%2CZNC');
    const data = response.data.rates;
    let date = new Date(response.data.date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    date = `${day}-${month}-${year}`;

    for (let symbol in data) {
      let price = data[symbol];

      price = Number(price).toFixed(2);
    
      await MineralSharePrice.findOneAndUpdate(
          { symbolsCode: symbol }, 
          { 
              latestPrice: price, 
              updateDate: date 
          }, 
          { new: true },  
      )
      .catch(err => console.error(`Failed to find and update document with symbol ${symbol}: ${err}`));
    }

    res.status(200).send("Prices and dates updated successfully");
  } catch(err) {
    next(err);
  }
}

cron.schedule('0 05 16 * * *', adminUpdateMineralsPrice, {
  scheduled: true,
  timezone: "UTC"
});


module.exports = { getMineralPrice, adminCreatePrice, adminUpdateMineralsPrice }


