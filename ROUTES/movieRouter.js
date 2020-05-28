const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbRead = require('../middleware/readDB')



router.get('/', dbRead, (req, res) => {

    //send back JSON with all of the movie docs
        console.log(req.dbData)

    res.json({
        status: 200,
        all_movies: req.dbData
    })


});


router.get('/:id', dbRead, validateReq, (req, res) => {

        if (!req.dbData.movies) {
            
           return res.status(500).json({
                status: 500,
                message: 'server can not be reached'
            })

        }
    const moviesCollection = req.dbData.movies;    

    const movieID = parseInt(req.params.id);

        if (isNaN(movieID)) {
            
           return res.status(200).json({
                status: 404,
                mesage: 'Not a valid ID, must be a number'
            });

        } else if (movieID <= 0 || movieID > moviesCollection.length-1){

            return res.status(400).json({
                status: 404,
                message: 'movie selected is not in the valid range'

            });
        };

    let foundMovie = moviesCollection[movieID-1];

    res.json({
        status: 200,
        movie: foundMovie
    });


});

//post a movie
router.post('/', (req, res) => {

});

//update a movie
router.patch('/', (req, res) => {

});

//delete a movie
router.delete('/:id', dbRead, validateReq, (req, res) => {

  let databaseData = req.dbData;

  databaseData.movies.splice(req.params.id-1, 1);

  console.log(databaseData.movies);
  

  databaseData = JSON.stringify(databaseData);

  console.log(databaseData.movies);


  let textFile = process.cwd() + '/database/usersDatabase.txt';

  fs.writeFileSync(textFile, databaseData)

  res.status(200).json({
      status: 200,
      delete_movie: req.found
  });



});


function validateReq(req, res, next){

    if (!req.dbData.movies) {
            
        return res.status(500).json({
             status: 500,
             message: 'server can not be reached'
         })

     }
 const moviesCollection = req.dbData.movies;    

 const movieID = parseInt(req.params.id);

     if (isNaN(movieID)) {
         
        return res.status(200).json({
             status: 404,
             mesage: 'Not a valid ID, must be a number'
         });

     } else if (movieID <= 0 || movieID > moviesCollection.length-1){

         return res.status(400).json({
             status: 404,
             message: 'movie selected is not in the valid range'

         });
     };

  req.found = moviesCollection[movieID-1];

    next()
}


module.exports = router;