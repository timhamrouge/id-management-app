import express from 'express';
import { createUser, authUser, updateUser, searchDetails, deleteUser } from './controllers/users'
import { destroySession } from './middleware';

const api = express.Router();

// Server
api.delete("/delete", deleteUser);
api.get('/search', searchDetails);
api.post("/auth", authUser);
api.post("/create", createUser);
api.put('/update', updateUser);

// Client
api.get('/', (req, res) => res.render('login'))
api.get('/register', (req, res) => res.render('registration'))
api.get('/home', (req, res) => res.render('home'))
api.get('/login', (req, res) => res.render('login'));
api.get('/logout', destroySession, (req,res) => res.redirect('login'));



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

export default api;