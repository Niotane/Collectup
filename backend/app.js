const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const Item = require('./models/items');
const cors = require('cors');
const uploadImage = require('./helpers');

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const MIME_TYPE_MAP = {
  'image/png': '.png',
  'image/jpeg': '.jepg',
  'image/jpg': '.jpg',
};

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 10MB.
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    callback(error, isValid);
  },
});

app.get('/', (req, res) => {
  res.send(`[x] API Live - ${Date.now()}`);
});

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

// add new post
app.post('/add', multerMid.single('image'), async (req, res) => {
  let {
    user,
    title,
    description,
    city,
    address,
    location,
    category,
  } = req.body;

  location = JSON.parse(location);

  let imageURL = '';
  if (req.file) {
    imageURL = await uploadImage(req.file);
  }

  const newItem = Item({
    user,
    title,
    imageURL,
    description,
    dateListed: new Date(),
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
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

app.listen(8080, () => {
  console.log('API started on port 8080');
});
