import express from "express";
import cors from 'cors';
import fs from "fs";
import env from "./env";
const app = express();
const expressWs = require('express-ws')(app);

const useragent = require('express-useragent');
app.use(useragent.express());



/**
 * 
 * @param {Object} req 
 * @param {*} res 
 * @param {*} next 
 */
const __lang = (req,res,next) => {
    // get language from user or env 
    req.lang = req.headers['lang'] || req.query.lang || env.LANG || "en"; 
    // function to get language object 
    req.__lang = () => {
        try {
            let filepath = __dirname + '/lang/' + req.lang+'.json';
            let file = fs.readFileSync(filepath, 'utf8');
            return JSON.parse(file);
        } catch (err) {
            console.error("Error while getting language "+req.lang);
            let filepath = __dirname + '/lang/en.json';
            let file = fs.readFileSync(filepath, 'utf8');
            return JSON.parse(file);
        }
    };
    next();
}
app.use(__lang);

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const success = (req, res, next) => {
    res.success = (body, message, code = 200) => {
      let response = {};
      response['statusCode'] = code || 200;
      response['status'] = true;
      response['message'] = message || req.__lang().success;
      response['body'] = body;
      res.status(code).json(response);
    };
    next();
};
app.use(success);

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const error = (req, res, next) => {
    res.error = (body, message, code = 500) => {
        console.error(`Error Occured on ${req.method}; URI = ${req.originalUrl};`)
        console.error(body);
        let response = {};
        response['statusCode'] = code || 500;
        response['status'] = false;
        response['message'] = message || req.__lang().failed;
        response['body'] = body;
        res.status(code).json(response);
    };
    next();
};
app.use(error);

/**
 * log all requests
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const logAllRequests = (req,res,next) => {
    const startHrTime = process.hrtime();
    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        console.info(`Method = ${req.method}; URI = ${req.originalUrl}; ${res.statusCode} ${res.statusMessage}; Elapsed time : ${elapsedTimeInMs}; ${res.get('Content-Length') || 0}b sent`)
    })
    next();
}
app.use(logAllRequests);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

module.exports = app;