import Users from '../models/users'
import mongoose from 'mongoose';


function createUser(req, res) {
    const { username, email, password } = req.body;
    let user = new Users({ username, email, password });

    mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
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

function updateUser(req,res) {
    const {username, email, password} = req.body;
    // not finished!
    mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
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

function authUser(request, response) {
    console.log('MADE IT SOOOOOON')
    const { username, password } = request.body;

    if (username && password) {

        mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

            return Users.findOne({ username });
        }).then((x) => {
            if (!x) {
                response.send('looks like you made a mistake');
                response.end();
            }


            if (x.password === password) {
                request.session.loggedin = true;
                request.session.username = username;
            }
            mongoose.connection.close();
        }).then(() => {
            console.log('closed and done'),
            response.redirect('/home');
        })
    .catch ((err) => {
            console.log(err);
        })
    }
    else {
        response.send('please enter a username and password');
        response.end();
    }
}

module.exports = { createUser, authUser }