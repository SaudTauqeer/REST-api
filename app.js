
const port =  process.env.PORT || 3000;
const express = require ('express');
const app = express();
const jsonParser = require('body-parser').json;
const routes = require('./routes/routes.js');
const logger = require('morgan');
app.use(jsonParser());
app.use(logger("dev"));
app.use("/questions", routes);




//Catching errors and forward to error handler.
app.use(function(req, res, next){
    const err = new Error("Not found");
    err.status= 400;
    next(err);
});

//Error handling middleware.
app.use(function(err, req, res, next){
   res.status(err.status || 500);
   res.json({
       err:{
           message: err.message
       }
   }); 

});

app.listen(port,(err)=>{
    if (!err)
            {console.log(`The express server is running at http://localhost:${port}`)}
});