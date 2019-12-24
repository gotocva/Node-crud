import express from "express";

const app = new express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

module.exports = app;