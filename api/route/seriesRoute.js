const express = require("express");
const Router = express.Router();
require("dotenv").config();
const seriesController = require("../controllers/seriesController");
const reviewController = require("../controllers/reviewController");

Router.route(process.env.FORWARD_SLASH)
    .get(seriesController.getAll)
    .post(seriesController.save);

Router.route("/totalcount")
    .get(seriesController.getTotalCount);

// Router.route(""+process.env.COUNT_URL)
//     .get(seriesController.getTotalCount);

Router.route(process.env.GEO_SEARCH_URL + process.env.PATH_ID_PARAMS)
    .get(seriesController.geoSearch);

Router.route(process.env.PHP_PATH_ID_PARAMS + process.env.REVIEW_URL)
    .post(reviewController.save)
    .get(reviewController.getAll);

Router.route(process.env.PHP_PATH_ID_PARAMS + process.env.REVIEW_URL +
    process.env.REVIEW_PATH_ID_PARAMS)
    .get(reviewController.getById)
    .delete(reviewController.deleteReviewById)
    .put(reviewController.updateReviewById)

Router.route(process.env.PATH_ID_PARAMS)
    .get(seriesController.getSeriesById)
    .delete(seriesController.deleteSeries)
    .patch(seriesController.update)
    .put(seriesController.updateAll);

Router.route(process.env.SEARCH_URL + process.env.NAME_PATH_ID_PARAMS)
    .get(seriesController.getSeriesByName);

module.exports = Router;