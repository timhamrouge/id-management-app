import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import api from './routes'

import hbs from 'express-handlebars';

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
app.use(morgan('tiny'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', api);

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
