import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import api from './routes';

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

mongoose.connect(process.env.DB_URL).then(() => {
  console.log(`connected to ${process.env.DB_URL}`);
});

app.use('/', api);

// app.use("/*", (req, res, next) => next({ status: 404 }));

// app.use((err, req, res, next) => {
//   if (err.status === 404) res.send({ msg: "PAGE NOT FOUND" });
//   next(err);
// });

// app.use((err, req, res, next) => {
//   if (err.status === 500) res.status(500).send({ err });
// });

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
