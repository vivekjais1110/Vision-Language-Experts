const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sequelize = require('./config/dbSQL');
const userRoutes = require('./routes/userRoutes');
const assetSQL_Routes = require('./routes/assetSQL_Routes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', assetSQL_Routes);

app.use(errorHandler);

//Databases

sequelize.sync()
  .then(() => console.log('Connected to SQL Database'))
  .catch((error) => console.error('SQL Database connection error:', error));

//Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

