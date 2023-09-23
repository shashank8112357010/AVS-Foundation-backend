const mongoose = require('mongoose');
const { Schema } = mongoose;



const productSchema = Schema({
    product_name: {
        unique: [true, "Product name already taken"],
        required: [true, "Product name is required "],
        type: String,
    },
    income_per_day: {
        type: Number,
        required: [true, "Income per day is required "],
    },
    profit_time: {
        type: String,
        required: true
    },
    validity_period: {
        type: String,
        required: [true, "Profit time is required "],
    },
    total_revenue: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true
    },
    limited: {
        type: String,
        required: true
    },
    categoryId: {
        type : String,
        required: true
    }

}, { timestamps: true });


module.exports = productModel = mongoose.model('products', productSchema);