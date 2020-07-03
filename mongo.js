import 'dotenv/config';
import mongoose from 'mongoose';
mongoose.Promise = Promise;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('User', userSchema);


function mongo (username, email, password) {
        mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}).then(() => {
            console.log('connected')
        })
        let user = new Users({username, email, password});

        console.log(user, 'USAR');

        user.save().then((x) => console.log('XYZ', x))

        // const db = mongoose.connection;

        // console.log(db);

        


}

module.exports = mongo;