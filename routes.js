import express from 'express';
import { createUser, authUser, updateUser, searchDetails, deleteUser } from './controllers/users'

const api = express.Router();

//endpoints we need

//user - get one, check username/email, put to update, post to create, delete

// DB STUFF
  api.put('/update', updateUser)

  api.post('/search', searchDetails)

api.post("/create", createUser);
api.post("/auth", authUser)

api.delete("/delete", deleteUser)


// view routes
api.get('/home', (request, response) => {
    if (request.session.loggedin) {
        response.render('home');
    } else {
        response.send('please login to view this page');
    }
    response.end();
})

api.get('/register', function(request, response) {
    response.render('registration', {layout: 'main', template: 'home-template'});
  })

api.get('/', function (req, res, next) {
    res.render('y', { layout: 'main', template: 'home-template' });
});

api.get('/login', (request, response) => {
    response.render('login');
});



api.post('/logout', function (req, res) {
    req.session.destroy()
    res.render('login');
})

export default api;