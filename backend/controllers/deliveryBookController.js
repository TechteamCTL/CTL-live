const DeliveryBook = require("../models/DeliveryBookModel");
const User = require("../models/UserModel");

const getAdminDeliveryBook = async (req, res, next) => {
    try {
        const deliveryBooks = await DeliveryBook.find({}).sort({ companyName: "asc" }).orFail();
        res.json(deliveryBooks);
    } catch (error) {
        next(error);
    }
};

const getDeliveryBook = async (req, res, next) => {
    try {
        const userEmail = req.params.email?.split("@")[1];
        const deliveryBooks = await DeliveryBook.find({ emailHost: userEmail }).orFail();
        res.json(deliveryBooks);
    } catch (error) {
        next(error);
    }
};

const getDeliveryBookById = async (req, res, next) => {
    try {
        const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();
        res.json(deliveryBook);
    } catch (err) {
        next(err);
    }
};

const adminCreateDeliveryBook = async (req, res, next) => {
    try {
        const deliveryBook = new DeliveryBook();
        const {
            companyName,
            emailHost,
            billingEmail,
            sites
        } = req.body;
        deliveryBook.companyName = companyName;
        deliveryBook.emailHost = emailHost;
        deliveryBook.billingEmail = billingEmail;
        if (sites.length > 0) {
            deliveryBook.sites = [];
            sites.map((item) => {
                const { name, billingAddress, deliveryAddress } = item;
                deliveryBook.sites.push({
                    name: name || "",
                    billingAddress: billingAddress || "",
                    deliveryAddress: deliveryAddress || "",
                });
            });
        } else {
            deliveryBook.sites = [];
        }
        await deliveryBook.save();

        res.json({
            message: "Delivery Book Created",
            deliveryBookId: deliveryBook._id,
        });
    } catch (err) {
        next(err);
    }
};

const adminUpdateDeliveryBook = async (req, res, next) => {
    try {
        const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();
        const {
            companyName,
            emailHost,
            billingEmail,
            sites
        } = req.body;
        deliveryBook.companyName = companyName || deliveryBook.companyName;
        deliveryBook.emailHost = emailHost || deliveryBook.emailHost;
        deliveryBook.billingEmail = billingEmail || deliveryBook.billingEmail;
        if (sites.length > 0) {
            deliveryBook.sites = [];
            sites.map((item) => {
                const { name, billingAddress, deliveryAddress } = item;
                deliveryBook.sites.push({
                    name: name || "",
                    billingAddress: billingAddress || "",
                    deliveryAddress: deliveryAddress || "",
                });
            });
        } else {
            deliveryBook.sites = [];
        }
        await deliveryBook.save();
        res.json({
            message: "Delivery Book Updated",
        });
    } catch (err) {
        next(err);
    }

};

const adminDeleteDeliveryBook = async (req, res, next) => {
    try {
        const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();
        await deliveryBook.remove();
        res.json({ message: "Delivery Book Deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = { adminCreateDeliveryBook, adminDeleteDeliveryBook, adminUpdateDeliveryBook, getDeliveryBook, getDeliveryBookById, getAdminDeliveryBook }