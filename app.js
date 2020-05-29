
//CONST VARIABLES******CONST VARIABLES******CONST VARIABLES******CONST VARIABLES******CONST VARIABLES******CONST VARIABLES******
const express = require('express');
const usersRouter = require('./routes/usersRouter')//this is middleware the will be executed on specific routes
const app = express();
const homeRouter = require('./ROUTES/homeRouter');//this is middleware the will be executed on specific routes
const port = process.env.PORT || 5000
const fs = require('fs');
const router = express.Router()
const movieRouter = require('./routes/movieRouter')//this is middleware the will be executed on specific routes
const morgan = require('morgan');

//LET VARIABLES*****LET VARIABLES*****LET VARIABLES*****LET VARIABLES*****LET VARIABLES*****LET VARIABLES*****LET VARIABLES*****
let reqBodyLog = require('./middleware/reqBodyLog');


//MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****MIDDLEWARE*****
//this is middleware that will be executed on all routes with all request
app.use('/', homeRouter)
app.use('/users', usersRouter)
app.use(express.static(__dirname +'/static'));
app.use(express.json());
app.use('/movies', movieRouter)
app.use(morgan('dev'));


//GET REQUESTS*****GET REQUESTS*****GET REQUESTS*****GET REQUESTS*****GET REQUESTS*****GET REQUESTS*****
app.get('/users', (req, res) => {
        res.send([1,2,3]);
});

    
app.get('/movies/:id', (req, res) => {
        
});


//POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*****POSTS*
app.post('/users', express.json(), reqBodyLog, (req, res) => {

    res.json(req.body)

});





//LISTENING ON THE SERVER*****LISTENING ON THE SERVER*****LISTENING ON THE SERVER*****LISTENING ON THE SERVER*****LISTENING ON THE SERVER*
app.listen(port, console.log(`listening on port ${port}`));