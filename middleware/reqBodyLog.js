function logRequestBody(req, res, next){

    console.log('this is middleware being fired');
    console.log(req.body);
    
    next()

}

module.exports = logRequestBody;