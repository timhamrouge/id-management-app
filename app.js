import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import hbs from 'express-handlebars';

import mongo from './mongo';

const app = express();

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', hbs());

// app.engine( 'hbs', hbs( {
//   extname: 'hbs',
//   defaultView: 'default',
//   layoutsDir: __dirname + '/views/layouts/',
//   partialsDir: __dirname + '/views/partials/'
// }));


// configure body-parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.get('/', function(req, res, next) {
  res.render('y', {layout: 'main', template: 'home-template'});
});

app.get('/login', (request, response) => {
  response.render('login');
});

app.get('/register', function(request, response) {
  response.render('registration', {layout: 'main', template: 'home-template'});
})

app.get('/mongo', function(req, res) {
  mongo('usrname', 'email', 'password');
})

app.post('/auth', (request, response) => {
  const { username, password } = request.body;

  if(username && password) {
    if(username === process.env.USERNAME && password === process.env.PASSWORD) {
      request.session.loggedin = true;
      request.session.username = username;
      response.redirect('/home');
    } else {
      response.send('Incorrect Username and/or Password!');
    }			
    response.end();
  }
  else {
    response.send('please enter a username and password');
    response.end();
  }
});

app.get('/home', (request, response) => {
  if (request.session.loggedin) {
    response.render('home');
  } else {
    response.send('please login to view this page');
  }
  response.end();
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
