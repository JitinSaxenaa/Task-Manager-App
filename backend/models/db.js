const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URI || process.env.DB_URL;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(DB_URL).then((mongooseInstance) => {
            console.log('MongoDB is Connected...');
            return mongooseInstance;
        }).catch((err) => {
            cached.promise = null;
            console.log('MongoDB Conn Error...', err);
            throw err;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = connectDB;
