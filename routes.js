import express from 'express';
import { createUser, authUser, updateUser, searchDetails, deleteUser } from './controllers/users';
import login from './controllers/login';
import { destroySession } from './middleware';

const api = express.Router();


api.delete("/delete", deleteUser);

api.get('/', (req, res) => res.render('login'))
api.get('/home', (req, res) => res.render('home'))
api.get('/login', (req, res) => res.render('login'));
api.get('/logout', destroySession, (req,res) => res.redirect('login'));
api.get('/register', (req, res) => res.render('registration'))
api.get('/search', searchDetails);

api.post("/login", login, authUser, (req, res) => res.render('home'));
api.post("/create", createUser);

api.put('/update', updateUser);

export default api;

// view routes needs a registration, a login, a home/dashboard, a logout
// api.get('/home', (request, response) => {
//     if (request.session.loggedin) {
//         response.render('home');
//     } else {
//         response.send('please login to view this page');
//     }
//     response.end();
// })

// api.get('/register', function (request, response) {
//     response.render('registration', { layout: 'main', template: 'home-template' });
// })

// api.get('/', function (req, res, next) {
//     res.render('y', { layout: 'main', template: 'home-template' });
// });

// api.get('/login', (request, response) => {
//     response.render('login');
// });
