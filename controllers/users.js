import Users from '../models/users'
import mongoose from 'mongoose';


function createUser(req, res) {
    const { username, email, password } = req.body;
    let user = new Users({username, email, password});

    mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected')
        return user.save()
    }).then((x) => {
        console.log('created', x)
        mongoose.connection.close()
    }).then(() => 
        console.log('closed and done'),
        res.send('ok')
    );
}

module.exports = { createUser }