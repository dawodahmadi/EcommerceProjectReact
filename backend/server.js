const express = require('express');
const app = express();
const { connectToDatabase } = require("./config/db.js");
require('dotenv').config();
const bodyParser = require('body-parser');
const products = require('./routes/api/products.js');
const orders = require("./routes/api/orders.js")
const wishlist = require("./routes/api/wishlist.js");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const paymentRoutes = require('./routes/api/paymentRoutes.js');
// Define routes and middleware here

const PORT = process.env.PORT || 5000;

const UserRouter = require('./routes/api/User.js');
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', products);
app.use('/order',orders);
app.use('/wish', wishlist);
app.use('/api/payment', paymentRoutes);
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Server open and connected to the database ✌",{PORT});
  });
}).catch(err => console.log(err));
app.use('/user',UserRouter); 


app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

