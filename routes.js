import express from 'express';
import { createUser, authUser } from './controllers/users'

const api = express.Router();

//endpoints we need

//user - get one, check username/email, put to update, post to create, delete

api.get('/', function (req, res, next) {
    res.render('y', { layout: 'main', template: 'home-template' });
});

api.get('/login', (request, response) => {
    response.render('login');
});

api.get('/register', function(request, response) {
    response.render('registration', {layout: 'main', template: 'home-template'});
  })

api.get('/home', (request, response) => {
    if (request.session.loggedin) {
        response.render('home');
    } else {
        response.send('please login to view this page');
    }
    response.end();
})

api.post('/exists', (req, res) => {
    console.log('hi tim');
})

api.post("/registration", createUser);
api.post("/auth", authUser)

api.post('/logout', function (req, res) {
    req.session.destroy()
    res.render('login');
})

export default api;