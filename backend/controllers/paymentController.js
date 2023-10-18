const paymentController = {
    processPayment: async (req, res) => {
      try {
        const { cardNumber, cvc, expiryDate, cardholderName, mobileNumber, amount } = req.body;
        const paymentSuccessful = true;
  
        if (paymentSuccessful) {
     
          return res.status(200).json({ success: 'Payment successful' });
        } else {
          // Payment failed
          return res.status(500).json({ error: 'Payment failed' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Payment failed' });
      }
    }
  };
  
  module.exports = paymentController;
  