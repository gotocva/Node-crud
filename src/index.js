

import env from "./config/env";
import app from "./config/express";

// mongoose connection
require("./config/mongoose");

const hash = (req,res,next) => {
    req._hash = (str) => {
        return require("crypto")
        .createHash("sha256")
        .update(str)
        .digest("hex");
    }
    next();
};
app.use(hash);

// routes injection
app.use('/api/v1',require('./routes/api'));

// catch 404 and shows not found message
app.use(function(req, res, next){
    res.error("path not found",req.__lang().error_404,404);
});

app.listen(env.PORT,() => { 
    console.log(`Application running on PORT ${env.PORT}`);
});
