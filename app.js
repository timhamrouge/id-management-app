import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

console.log(process.env.USERNAME, process.env.PASSWORD)

// configure body-parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));


app.get('/', (request, response) => {
  response.sendFile(path.join(`${__dirname}/views/login.html`));
});

app.post('/auth', (request, response) => {
  console.log(request.session.resave, 'thi', request.body);

  const { username, password } = request.body;
  if(username && password) {
    console.log('yes')
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
})

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
