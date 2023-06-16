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

const adminCreateDeliveryBook = async (req, res, next) => {
    try {
        const deliveryBook = new DeliveryBook();
        const {
            companyName,
            emailHost,
            sites
        } = req.body;
        deliveryBook.companyName = companyName;
        deliveryBook.emailHost = emailHost;
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
            message: "Delivery Book created",
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
            sites
        } = req.body;
        deliveryBook.companyName = companyName || deliveryBook.companyName;
        deliveryBook.emailHost = emailHost || deliveryBook.emailHost;
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
            message: "delivery Book updated",
        });
    } catch (err) {
        next(err);
    }

};

const adminDeleteDeliveryBook = async (req, res, next) => {
    try {
        const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();
        await deliveryBook.remove();
        res.json({ message: "Delivery Book Removed" });
    } catch (err) {
        next(err);
    }
};

module.exports = { adminCreateDeliveryBook, adminDeleteDeliveryBook, adminUpdateDeliveryBook, getDeliveryBook, getAdminDeliveryBook }