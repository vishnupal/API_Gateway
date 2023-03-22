# Api gateway

## Project Setup
- clone the project on your local machine 
- Execute command `npm install` on the same path as of your root directory of the downloaded project

## Use
- in our Airline management project we need to expose our service to outside the word , rather the exposing all service we expose single Endpoint for all service
- single endpoint validated all the service like authentication then forward to our actual service
- so it  work like a proxy server in between our client and services
```js
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
```
- I created a middleware so first verify user then goto to next endpoint
```js
app.use(
  '/bookingservice',
  createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true })
);
```
- here i use `http-proxy-middleware` package it work like a proxy server so it forward our request to  booking microservice
- we also set rate limit for demo purpose i only set 2 minute
```js
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
});
```
