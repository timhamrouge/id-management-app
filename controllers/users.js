import Users from '../models/users'
import mongoose from 'mongoose';
import {
    connect as connectToDB,
    disconnect
} from '../utils/db';

function createUser(req, res) {
    const { username, email, password } = req.body;
    let user = new Users({ username, email, password });


    return user.save().then(() => {
    }).then((x) => {
        console.log('created', x)
        mongoose.connection.close()
    }).then(() =>
        console.log('closed and done'),
        res.send('ok')
    );
}

function updateUser(req, res) {
    const { username, payload } = req.body;

    // not finished!
    connectToDB().then(() => {
        return Users.findOneAndUpdate({ username }, { ...payload }, { new: true })
    }).then((x) => {
        console.log('updated', x)
        // mongoose.connection.close()
    }).then(() =>
        console.log('closed and done'),
        res.send('ok')
    );

}

function authUser(req, res, next) {
    const { username, password } = req.body;

    Users.findOne({ username })
        .then((result) => {
            console.log(result)
            if (!result) {
                return res.render('login', {
                    bad_auth: true,
                    bad_user: true
                })
            }

            if (result.password === password) {
                req.session.loggedin = true;
                req.session.username = username;
                return res.status(200).redirect('/home');
            } else {
                return res.render('login', {
                    bad_auth: true,
                    bad_pass: true
                })
            }
        }).catch((err) => {
            next(err);
        })
}

function searchDetails(req, res) {
    const query = req.query;

    if (Object.keys(query).length > 1) {
        res.send('you can only search by one thing at a time')
        return res.end();
    }

    if (query.username || query.email) {
        connectToDB()
            .then(() => {
                return Users.findOne({ ...query })
            })
            .then((x) => {
                console.log(x)
                if (!x) {
                    res.send('nope')
                }
                else {
                    res.send('found one')
                }
            })
    }
    else {
        res.send('unsupported search')
    }


}

function deleteUser(req, res) {
    const { username } = req.body;

    connectToDB()
        .then(() => {
            return Users.findOneAndRemove({ username })
        })
        .then((x) => {
            console.log(x);
        })

}

module.exports = { createUser, authUser, updateUser, searchDetails, deleteUser }