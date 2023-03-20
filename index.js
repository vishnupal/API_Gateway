const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 3005;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(morgan('combined'));
app.use('/bookingservice', async (req, res, next) => {
  console.log(req.headers['x-access-token']);
  try {
    const response = await axios.get(
      'http://localhost:3001/api/v1/isauthenticate',
      {
        headers: {
          'x-access-token': req.headers['x-access-token'],
        },
      }
    );
    if (response.data.success) {
      next();
    } else {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
});
app.use(
  '/bookingservice',
  createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true })
);
app.get('/home', (req, res) => {
  return res.status(200).json('hhhh');
});
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
