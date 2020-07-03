import express from 'express';
// import getUser from 

const api = express.Router();

//endpoints we need

//user - get one, check username/email, put to update, post to create, delete

api.get("user", getUser);