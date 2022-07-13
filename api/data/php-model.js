const mongoose = require("mongoose");
require("dotenv").config();


let reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    description: String
});

let locationSchema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        lng: Number
    },
    country: String
});

let castSchema = new mongoose.Schema({
    name: String,
    gender: String
});

let seriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    language: [String],
    genre: String,
    presentYear: Number,
    review: [reviewSchema],
    cast: [castSchema],
    production: locationSchema
});



mongoose.model(process.env.MODEL_NAME, seriesSchema, process.env.DATABASE_COLLECTION_NAME);