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

function findUser(req, res) {
    console.log('MADE IT SOOOOOON')
    const { username, password } = req.body;

    mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        
        return Users.findOne({username});
    }).then((x) => {
        if (x.password === password) {
            res.render('home');
        }
        // mongoose.connection.close()
    })
    .catch((err) => {
        console.log(err);
    })
    // .then(() => 
    //     console.log('closed and done'),
    //     res.send('ok')
    // );

}

module.exports = { createUser, findUser }