const mongoose = require("mongoose");

const WeathesSchema = new mongoose.Schema(
    {
        Location: {
            type: String,
            required: true,
        },
        maxtemp_c: {
            type: String,
            required: true,
        },
        mintemp_c: {
            type: String,
            required: true,
        },
        avgtemp_c: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    });

const Weathes = mongoose.model("Weathes", WeathesSchema);
module.exports = Weathes;