// puerto
process.env.PORT = process.env.PORT || 3000;


// ambiente
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//bd
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://admin:TPITAmW8UlL6sE4N@cluster0-wtvzc.mongodb.net/cafe';
    //url = process.env.MONGO_URI;
    // heroku config:set MONGO_URI="mongodb+srv://admin:TPITAmW8UlL6sE4N@cluster0-wtvzc.mongodb.net/cafe"
    // heroku config
}

process.env.urlDB = urlDB;



