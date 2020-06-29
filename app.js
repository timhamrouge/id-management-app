import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extened: true }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.sendFiles(path.join(`${__dirname}/views/login.html`));
});
