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
    const { username, payload } = req.body;

    // not finished!
    mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        return Users.findOneAndUpdate({ username }, { ...payload }, { new: true })
    }).then((x) => {
        console.log('updated', x)
        // mongoose.connection.close()
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

function searchDetails(req, res) {
    const payload = req.body;

    if (Object.keys(payload).length > 1) {
        res.send('you can only search by one thing at a time')
        return res.end();


    }

    if (payload.username || payload.email) {
    mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return Users.findOne({...payload})
    })
    .then((x) => {
        console.log(x)
        if (!x) {
            res.send('nope')
        }
        else {
            res.send('found one')
        }
    })}
    else {
    res.send('unsupported search')
}


}

module.exports = { createUser, authUser, updateUser, searchDetails }