const mongoose = require("mongoose");
const PHP = mongoose.model("Series");
require("dotenv").config();

const response = {
    status: process.env.STATUS_OK,
    message: process.env.SUCCESS
}

const save = function (req, res) {
    const phpId = req.params.phpId;
    console.log("php id", phpId);
    if (!mongoose.isValidObjectId(phpId)) {
        console.log(process.env.INVALID_ID_MESSAGE, phpId);
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json({ 'message': process.env.INTERNAL_SERVER_ERROR });
    } else {
        PHP.findById(phpId).select("review")
            .then((php) => checkNullValue(php))
            .then((php) => {
                console.log(php);
                __addReview(req, php, response);
            })
            .catch((err) => {
                console.log(process.env.ERROR, err);
                fillResponse(response,
                    process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    err);
            })
            .finally(() => sendResponse(response, res));
    }
}


let __addReview = function (req, php, response) {
    console.log("Inside __addReview");
    console.log(php);
    console.log("rating------>", req.body.rating);
    console.log("description---->", req.body.description);
    const review = {
        rating: req.body.rating,
        description: req.body.description
    }
    console.log("ph", php.review)
    php.review.push(review);
    php.save()
        .then((phpUpdated) => {
            console.log("Updated php: ", phpUpdated);
            fillResponse(response, process.env.STATUS_OK,
                phpUpdated)
        })
        .catch((error) => fillResponse(response,
            process.env.INTERNAL_SERVER_ERROR_STATUS_CODE, error));
}

let getAll = function (req, res) {

    const phpId = req.params.phpId;

    if (!mongoose.isValidObjectId(phpId)) {
        console.log("Invalid phpId:", phpId, " Review controller line 61 ");
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE).json({ 'message': process.env.INTERNAL_SERVER_ERROR });

    } else {
        PHP.findById(phpId).select("review")
            .then((reviews) => checkNullValue(reviews))
            .then((reviews) => {
                console.log("reviews found.....review controller");
                console.log(reviews);
                fillResponse(response, process.env.STATUS_OK, reviews);
            })
            .catch((err) => {
                console.log(process.env.ERROR, err);
                fillResponse(response,
                    process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    err);
            })
            .finally(() => sendResponse(response, res));

    }
}

let getById = function (req, res) {
    const phpId = req.params.phpId;
    const reviewId = req.params.reviewId;

    if (!mongoose.isValidObjectId(phpId) && !mongoose.isValidObjectId(reviewId)) {
        console.log("Review controller line 89->", "phpId or reviewId not valid");
        sendResponse(response,
            process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
            process.env.INTERNAL_SERVER_ERROR);
    } else {
        PHP.findById(phpId).select("review")
            .then((review) => checkNullValue(review))
            .then((review) => {
                console.log("reviews found.....review controller");
                console.log(review);
                fillResponse(response, process.env.STATUS_OK, review);
            })
            .catch((err) => {
                console.log(process.env.ERROR, err);
                fillResponse(response,
                    process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    err);
            })
            .finally(() => sendResponse(response, res));
    }
}


let deleteReviewById = function (req, res) {
    const phpId = req.params.phpId;
    const reviewId = req.params.reviewId;


    if (!mongoose.isValidObjectId(phpId) && !mongoose.isValidObjectId(reviewId)) {
        console.log("Review controller line 89->", "phpId or reviewId not valid");
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json(process.env.INTERNAL_SERVER_ERROR);
    } else {
        PHP.findById(phpId).select("review")
            .then((php) => checkNullValue(php))
            .then((php) => {
                console.log("reviews found.....review controller");
                console.log(php);
                console.log(reviewId);
                console.log("test---->", php.review.id(reviewId))
                php.review.id(reviewId).remove();
                php.save()
                    .then((savedService) => {
                        console.log("Review Controller delete ", updated);
                        fillResponse(response,
                            process.env.STATUS_OK,
                            process.env.DELETED_SUCCESSFULLY);
                    })
                    .catch((err) => {
                        console.log(process.env.ERROR, err);
                        fillResponse(response,
                            process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                            err);
                    });
            })
            .catch((err) => {
                console.log(process.env.ERROR, err);
                fillResponse(response,
                    process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    err);
            })
            .finally(() => sendResponse(response, res));
    }
}


let updateReviewById = function (req, res) {
    const phpId = req.params.phpId;
    const reviewId = req.params.reviewId;

    const review = {
        rating: req.body.rating,
        description: req.body.description
    }

    console.log("Update review controller");

    if (!mongoose.isValidObjectId(phpId) && !mongoose.isValidObjectId(reviewId)) {
        console.log("Review controller line 89->", "phpId or reviewId not valid");
        res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .json(process.env.INTERNAL_SERVER_ERROR);
    } else {
        PHP.findById(phpId).select("review")
            .then((php) => checkNullValue(php))
            .then((php) => {
                const reviewToUpdate = php.review.id(reviewId);
                reviewToUpdate.rating = review.rating;
                reviewToUpdate.description = review.description;
                php.save()
                    .then((updatePhp) => {
                        console.log("Review Controller delete ", updatePhp);
                        fillResponse(response,
                            process.env.STATUS_OK,
                            process.env.UPDATED_SUCCESSFULLY);
                    })
                    .catch((err) => {
                        console.log(process.env.ERROR, err);
                        fillResponse(response,
                            process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                            err);
                    });
            })
            .catch((err) => {
                console.log(process.env.ERROR, err);
                fillResponse(response,
                    process.env.INTERNAL_SERVER_ERROR_STATUS_CODE,
                    err);
            })
            .finally(() => sendResponse(response, res));

    }
}

let checkNullValue = function (reviews) {
    return new Promise((resolve, reject) => {
        if (reviews != null) {
            resolve(reviews);
        }
        else {
            reject("Content Not found");
        }
    });
}

const fillResponse = function (response, status, message) {
    console.log(message);
    response.status = status;
    response.message = message;
}

const sendResponse = function (response, res) {
    res.status(response.status).json(response.message);
}

module.exports = { save, getAll, getById, deleteReviewById, updateReviewById }