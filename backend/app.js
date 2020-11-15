const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const cors = require('cors');
const fileUpload = require('./fileUpload');

const app = express();

app.use(cors());

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// returns the coords of all registered items
app.get('/location', (req, res, next) => {
  Item.find()
    .then((data) => res.json({ data }))
    .catch((err) => console.log(err));
});

// retrieve all listings by default. comes with filters that allows user to specify a category
app.get('/filter', async (req, res) => {
  const queries = req.query;
  console.log(queries);

  let categoryQuery = {};
  if (queries.category) {
    categories = queries.category.replace(/-/g, '').split('%');
    categoryQuery = { category: { $in: categories } };
  }

  let countryQuery = {};
  if (queries.country) {
    countryQuery = {
      country: { $eq: queries.country },
    };
  }

  let data;
  try {
    data = await Item.aggregate([
      { $match: { $and: [categoryQuery, countryQuery] } },
    ]);
  } catch (err) {
    throw err;
  }

  res.json({ data });
});

// images folder host photos
app.use('/images', express.static('images'));

// add new post
app.post('/add', fileUpload.single('image', 1), (req, res) => {
  let {
    user,
    phoneNumber,
    description,
    country,
    address,
    location,
    category,
    city,
  } = req.body;

  location = JSON.parse(location);
  const imageURL = req.file.path;

  const newItem = Item({
    user,
    phoneNumber,
    imageURL,
    description,
    dateListed: new Date(),
    country,
    address,
    location,
    category,
    city,
    isCollected: false,
  });

  newItem
    .save()
    .then(() => res.json({ postAdded: true }))
    .catch((err) => console.log(err.message));
});

// throws error if API not listed above
app.use((req, res, next) => {
  const error = new Error('API endpoint is not valid');
  error.status = 400;
  res.status(error);
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
