const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://aryan:aryan123@cluster0.520m4fw.mongodb.net/?appName=Cluster0'

module.exports = function (callback) {
    mongoose.connect(mongoURI, { 
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4
    }, async (err, result) => {
        if (err) {
            console.log("MongoDB connection error: " + err)
            callback(err, null, null)
        } else {
            console.log("connected to mongo")
            // Food/category collections removed — app now focuses on auth/dashboard only
            callback(null, null, null)
        }
    })
};
