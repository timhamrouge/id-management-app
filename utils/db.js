import mongoose from 'mongoose';
import 'dotenv/config';
const  { DB_URL } = process.env;


export default () => {
    return mongoose.connect(`${DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
}