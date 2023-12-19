const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = 3001;

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/receipt_db';

app.use(express.json());

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db('receipt_db'); // Specify the database name

  console.log('Database connected!');

  // Define your Receipt schema and model using mongoose
  const receiptCollection = db.collection('receipts');

  // Define a route to handle receipt saving
  app.post('/api/receipts', async (req, res) => {
    try {
      const receiptData = req.body;
      // Save the receipt data to the database
      await receiptCollection.insertOne(receiptData);
      res.status(201).json({ message: 'Receipt saved successfully' });
    } catch (error) {
      console.error('Error saving receipt:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
