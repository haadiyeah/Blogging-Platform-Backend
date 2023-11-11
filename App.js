const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const User=require("./models/User");
const userRoutes = require('./routes/userModuleRoutes');
const blogRoutes = require('./routes/blogPostRoutes');
app.use(bodyParser.json());

//DB connection
mongoose.connect('mongodb://localhost:27017/blogDB');

//all the routes for user module
app.use('/users', userRoutes);
//all the routes for blog post management
app.use('/blogs', blogRoutes);

//pooooooooooooooorrrt
const port=3000;
app.listen(port, () => {
  console.log("Server is running, Listening on port 3000");
});
