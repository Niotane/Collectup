const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');

// set up socket.io for live chat
const app = express();

app.use(bodyParser.json());

// Boilerplate to bypass CORS
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, *',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
  });

  next();
});

// retrieve all listings by default. allows user to specify a country
app.get('/', async (req, res) => {
  const queries = req.query;

  let countryQuery = {};
  if (queries.country) {
    countryQuery = {
      country: { $in: queries.country },
    };
  }

  res.json({ hi: 'hi' });
});

app.post('/', (req, res) => {
  const {
    user,
    phoneNumber,
    description,
    country,
    address,
    location,
  } = req.body;

  const newItem = Item({
    user,
    phoneNumber,
    description,
    dateListed: new Date(),
    country,
    address,
    location,
    isCollected: false,
  });

  newItem
    .save()
    .then(() => res.json({ postAdded: true }))
    .catch((err) => console.log(err.message));
});

app.use(() => {
  const error = new Error('API endpoint is not valid');
  error.status = 400;
});

// password = 4OLRNDV8YzIKc9Vr
mongoose
  .connect(
    'mongodb+srv://admin:4OLRNDV8YzIKc9Vr@cluster0.68z4j.mongodb.net/Cluster0?retryWrites=true&w=majority',
    // avoid some deprecation warnings
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => app.listen(5000))
  .catch((err) => {
    console.log(err);
  });
