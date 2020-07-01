import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

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

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
