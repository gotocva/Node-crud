


import app from "./config/express";

// import mongoose connection
import conn from "./config/mongoose";

// import api routes
import ApiRouter from "./routes/api";

// import admin routes
import AdminRouter from "./routes/admin";

app.use('/api/v1',ApiRouter);
app.use('/admin/v1',AdminRouter);

app.listen(8000);