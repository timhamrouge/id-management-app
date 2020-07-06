import mongoose from 'mongoose';
import 'dotenv/config';
const  { DB_URL } = process.env;


function connect() {
    return mongoose.connect(`${DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
}

function disconnect () {
    return mongoose.connection.close();
}


module.exports = { connect, disconnect };