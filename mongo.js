import 'dotenv/config';
import mongoose from 'mongoose';


function mongo (username, email, password) {
        mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}).then(() => {
            console.log('connected');
        });


}

module.exports = mongo;