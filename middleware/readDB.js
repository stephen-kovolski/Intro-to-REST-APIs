const fs = require('fs');


function retreiveDB(req, res, next){
    const textFile = process.cwd() + '/database/usersDatabase.txt';
    const rawData = fs.readFileSync(textFile, 'utf-8');
    const parsedData = JSON.parse(rawData);

    req.dbData = parsedData;


    next()

}




module.exports = retreiveDB;