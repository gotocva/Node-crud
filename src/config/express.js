import express from "express";

const app = new express();

app.use(express.json());


module.exports = app;