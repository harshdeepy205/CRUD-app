const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
const url = "mongodb://localhost:27017";
const mongoOptions = {
    useNewUrlParser: true
};

const state = {
    db: null
};

const connect = (cb) => {

    if (state.db)
        cb();
    else {
        // attempt to get database connection
        MongoClient.connect(url, mongoOptions, (err, client) => {
            // unable to get database connection pass error to CB
            if (err)
                cb(err);
            // Successfully got our database connection
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}


const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

// returns database connection 
const getDB = () => {
    return state.db;
}

module.exports = {
    getDB,
    connect,
    getPrimaryKey
};