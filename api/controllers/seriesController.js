const mongoose = require("mongoose");
const SERIES = mongoose.model("Series");
require("dotenv").config();

let response = {
    status: process.env.STATUS_OK,
    message: process.env.SUCCESS
}

let getAll = function (req, res) {

    console.log("inside get all");

    if (isNaN(req.query.offset) || isNaN(req.query.count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
        return;
    }

    let offset = process.env.DEFAULT_OFFSET;
    let count = process.env.DEAFULT_COUNT;

    if (req.query.offset && req.query.count) {
        offset = parseInt(req.query.offset, 10);
        count = parseInt(req.query.count, 10);
    }

    SERIES.find().skip(offset).limit(count)
        .then((series) => checkNullValue(series))
        .then((series) => {
            console.log(process.env.SERIES_FOUND);
            fillResponse(response, process.env.STATUS_OK, series);
        })
        .catch((error) => {
            console.log(error);
            fillResponse(response, process.env.CONTENT_NOT_FOUND_STATUS_CODE, error);
        })
        .finally(() => sendResponse(response, res));
}

let checkNullValue = function (series) {
    return new Promise((resolve, reject) => {
        if (series != null) {
            resolve(series);
        }
        else {
            reject(process.env.CONTENT_NOT_FOUND);
        }
    });
}

let getTotalCount = function (req, res) {

    console.log("inside total count");

    const response = {
        status: 200,
        message: ''
    }

    SERIES.find().count()
        .then(count => fillResponse(response, 200, count))
        .catch((err) => fillResponse(response, 505, err))
        .finally(() => sendResponse(response, res));
}

let getSeriesById = function (req, res) {

    const seriesId = req.params.id;
    if (!mongoose.isValidObjectId(seriesId)) {
        console.log(process.env.INVALID_ID_MESSAGE, seriesId);
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json({ 'message': process.env.INVALID_ID_MESSAGE, seriesId });
    } else {
        SERIES.findById(seriesId)
            .then((series) => checkNullValue(series))
            .then((series) => {
                console.log(process.env.SERIES_FOUND);
                fillResponse(response, process.env.STATUS_OK, series);
            })
            .catch((error) => {
                console.log(error);
                fillResponse(response, process.env.CONTENT_NOT_FOUND_STATUS_CODE, error);
            })
            .finally(() => sendResponse(response, res));

    }
}


let save = function (req, res) {
    console.log(req);

    const review = req.body.review;

    const language = req.body.language;
    console.log("language->", language);
    const production = req.body.production;
    console.log("production->", production);

    const series = {
        name: req.body.name,
        language: language,
        genre: req.body.genre,
        presentYear: req.body.presentYear,
        review: review,
        cast: cast,
        production: production
    }

    console.log(series);

    SERIES.create(series)
        .then((series) => {
            console.log(series)
            console.log(process.env.SERIES_FOUND);
            fillResponse(response, process.env.STATUS_OK, series);
        })
        .catch((error) => {
            console.log(error);
            fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                INTERNAL_SERVER_ERROR);
        })
        .finally(() => sendResponse(response, res));

}

let deleteSeries = function (req, resp) {

    const seriesId = req.params.id;
    if (!mongoose.isValidObjectId(seriesId)) {
        console.log(process.env.INVALID_ID_MESSAGE, seriesId);
        resp.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json({ 'message': process.env.INVALID_ID_MESSAGE, seriesId });
    } else {
        SERIES.findByIdAndDelete(seriesId)
            .then((series) => checkNullValue(series))
            .then((series) => {
                console.log(process.env.SERIES_FOUND);
                fillResponse(response, process.env.STATUS_OK, process.env.DELETED_SUCCESSFULLY);
            })
            .catch((error) => {
                console.log(error);
                fillResponse(response, process.env.CONTENT_NOT_FOUND_STATUS_CODE, error);
            })
            .finally(() => sendResponse(response, resp));
    }
}

let update = function (req, res) {

    const seriesUpdate = {
        name: req.body.name,
        language: req.body.language
    }

    console.log(seriesUpdate);

    const seriesId = req.params.id;
    if (!mongoose.isValidObjectId(seriesId)) {
        console.log(process.env.INVALID_ID_MESSAGE, seriesId);
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json({ 'message': process.env.INVALID_ID_MESSAGE, seriesId });
    } else {
        SERIES.findById(seriesId)
            .then((series) => checkNullValue(series))
            .then((series) => {
                console.log(process.env.SERIES_FOUND);
                series.name = seriesUpdate.name;
                series.language = seriesUpdate.language;
                series.save()
                    .then((updatedSeries) => {
                        console.log(process.env.ERROR, err);
                        fillResponse(response, process.env.STATUS_OK,
                            process.env.UPDATED_SUCCESSFULLY);
                    })
                    .catch((err) => {
                        console.log(process.env.ERROR, err);
                        fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                            process.env.INTERNAL_SERVER_ERROR);
                    });

            })
            .catch((err) => {
                console.log("error", err);
                console.log(process.env.ERROR, err);
                fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    process.env.INTERNAL_SERVER_ERROR);
            })
            .finally(() => sendResponse(response, res))
    }
}

let updateAll = function (req, res) {

    const seriesUpdate = {
        name: req.body.name,
        language: req.body.language,
        genre: req.body.genre,
        presentYear: req.body.presentYear,
        review: req.body.review,
        cast: req.body.cast
    }

    console.log(seriesUpdate);

    const seriesId = req.params.id;
    if (!mongoose.isValidObjectId(seriesId)) {
        console.log(process.env.INVALID_ID_MESSAGE, seriesId);
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json({ 'message': process.env.INVALID_ID_MESSAGE, seriesId });
    } else {

        SERIES.findById(seriesId)
            .then((series) => checkNullValue(series))
            .then((series) => {
                console.log(process.env.SERIES_FOUND);
                series.name = seriesUpdate.name;
                series.language = seriesUpdate.language;
                series.genre = seriesUpdate.genre;
                series.presentYear = seriesUpdate.presentYear;
                series.save()
                    .then((updatedSeries) => {
                        console.log(process.env.ERROR, err);
                        fillResponse(response, process.env.STATUS_OK,
                            process.env.UPDATED_SUCCESSFULLY);
                    })
                    .catch((err) => {
                        console.log(process.env.ERROR, err);
                        fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                            process.env.INTERNAL_SERVER_ERROR);
                    });

            })
            .catch((err) => {
                console.log("error", err);
                console.log(process.env.ERROR, err);
                fillResponse(response, process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    process.env.INTERNAL_SERVER_ERROR);
            })
            .finally(() => sendResponse(response, res))
    }

}

let getSeriesByName = function (req, res) {

    const seriesName = req.params.name;
    if (!req.params.name) {
        console.log("Search data not valid");
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json({ 'message': process.env.SEARCH_ERROR_MESSAGE });
    } else {
        SERIES.find({ name: { $regex: seriesName } })
            .then((series) => checkNullValue(series))
            .then((series) => {
                console.log(process.env.SERIES_FOUND);
                fillResponse(response, process.env.STATUS_OK, series);
            })
            .catch((error) => {
                console.log(error);
                fillResponse(response, process.env.CONTENT_NOT_FOUND_STATUS_CODE, error);
            })
            .finally(() => sendResponse(response, res));
    }
}

const geoSearch = function (req, res) {

    console.log("geo search");

    const response = {
        status: 200,
        message: ""
    }

    let offset = 0;
    let count = 5;
    let lat = 0;
    let lng = 0;
    let id = "";

    if (req.params.id && req.query.offset && req.query.count && req.query.lng && req.query.lat) {
        offset = parseInt(req.query.offset, 10);
        count = parseInt(req.query.count, 10)
        lat = parseFloat(req.query.lat)
        lng = parseFloat(req.query.lng)
        id = req.params.id;
        console.log(lat);
        console.log(lng);
    } else {
        console.log("pagination missing")
        res.status(500).json({ "message": "pagination missing" })
        return;
    }
    const point = {
        type: "Point",
        coordinates: [lat, lng]
    }
    console.log("point-->", point);
    const query = {
        'production.location':
        {
            $near:
            {
                $geometry: point,
                $maxDistance: 1000,
                $minDistance: 0
            }
        }
    }
    const query2 = { _id: { $ne: id } }
    console.log("query-->", query)
    SERIES.find({
        $and: [
            query2,
            query
        ]
    }).skip(offset).limit(count)
        .then((series) => checkNullValue(series))
        .then((series) => {
            console.log(process.env.SERIES_FOUND);
            fillResponse(response, process.env.STATUS_OK, series);
        })
        .catch((error) => {
            console.log(error);
            fillResponse(response, process.env.CONTENT_NOT_FOUND_STATUS_CODE, error);
        })
        .finally(() => sendResponse(response, res));
}

const fillResponse = function (response, status, message) {
    console.log(message);
    response.status = status;
    response.message = message;
}

const sendResponse = function (response, res) {
    res.status(response.status).json(response.message);
}

module.exports = {
    getAll, 
    getSeriesById,
    save,
    deleteSeries,
    update, updateAll,
    getSeriesByName,
    getTotalCount, 
    geoSearch
}