const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbRead = require('../middleware/readDB')
const textFile = process.cwd() + '/database/usersDatabase.txt';



router.get('/', dbRead, (req, res) => {

    //send back JSON with all of the movie docs
        console.log(req.dbData)

    res.json({
        status: 200,
        all_movies: req.dbData
    })


});


router.get('/:id', dbRead, validDB, (req, res) => {

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
router.post('/', dbRead, validNewMovie, (req, res) => {

    newDataBaseData = req.dbData;

    newDataBase.movies.push(req.body);

    newDataBaseData = JSON.stringify(newDataBaseData);

    fs.writeFileSync(textFile, newDataBaseData);

    res.json(200).json({
        status: 200,
        message: 'posted successfully',
        new_movie: 'movieObj'
    })

});

//update a movie
router.patch('/', (req, res) => {

});

//delete a movie
router.delete('/:id', dbRead, validDB, (req, res) => {

  let databaseData = req.dbData;

  databaseData.movies.splice(req.params.id-1, 1);

  console.log(databaseData.movies);
  

  databaseData = JSON.stringify(databaseData);

  console.log(databaseData.movies);


  

  fs.writeFileSync(textFile, databaseData)

  res.status(200).json({
      status: 200,
      delete_movie: req.found
  });



});


function validDB(req, res, next){

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


function validNewMovie(req, res, next) {

    let missingkeys = [];


    //get the new movie in a JS object

    console.log(req.body)

    //check for title, release, availabel,, imdbLink, img

    const { title: t, release: r, available: a, imdbLink: imdb, img: img } = req.body,

    newMovObj = {
        title: t,
        release: r,
        available: a,
        imdbLink: imdb,
        img: img
    };

        let bodyLength = Object.keys(req.body).length;

        newMovObjLength = Object.keys(newMovObj).length;

    if (bodyLength < newMovObjLength || bodyLength > newMovObjLength + 20) {

        return res.status(400).json({
                status: 400,
                message: 'Bad Request, there were too few or too many key/value pairs',
                req_body_length: bodyLength,
                required_body_length: newMovObjLength
        });
        
        
    }


    for (const k in newMovObj) {
        if ( newMovObj[k] == undefined ) {

            missingkeys.push(k)
            
        }
    }

    if (missingKeys.length > 0) {
        
       return res.status(400).json({
            status: 400,
            error: 'Missing Keys',
            message: `The request body was missing the keys: ${missingKeys}`
        })

    }


    req.body = newMovObj;


    //make sure user data is valid
        //if respond with client error status code

    next()

}


module.exports = router;