const express = require('express');
const fs = require('fs');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('User\'s Page')
});

router.get('/test', (req, res) => {
    
    let textFile = process.cwd() + '\\database\\usersDatabase.txt',
        parsedData = fs.readFileSync(textFile, 'utf8');


        if (parsedData[0] != '{' || parsedData[parsedData.length-1] != '}') {
            res.send('no users yet')
        }

        parsedData = JSON.parse(parsedData)

        let allUsers = '';

        for (let i = 0; i < parsedData.user.length; i++) {
            for (const key in parsedData.user[i]) {

                const value = object[key];
                allUsers += `User ${i+1}${key} - ${value}\n`;
            }
            
        }

        res.send(allUsers)
});

router.post('/', (req, res) => {


    let textFile = process.cwd() + '\\database\\usersDatabase.txt',
        parsedData = fs.readFileSync(textFile, 'utf8');


        if (parsedData[0] != '{') {
            parsedData = '{}'
        }


    // fs.readFileSync(textFile, 'utf8', (err, rawData) => {

    //     if (err) {
    //         console.log(err);
    //         res.json({
    //             message: err.message,
    //             status: 500,
    //         });
    //     }

            parsedData = JSON.parse(parsedData);


        if (parsedData.user == undefined) {
            
            parsedData.user = [req.body]

        } else {

            parsedData.user.push(req.body)

        }

        parsedData = JSON.stringify(parsedData)
        fs.writeFileSync(textFile, parsedData)

    res.json({
        message: 'successful new user',
        status: 200,
        new_user: req.body
    });
        
});

module.exports = router;