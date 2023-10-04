const mongoose = require('mongoose');

// Debug: Print the value of MONGODB_URI to the console
// this is a test
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

