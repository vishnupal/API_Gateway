FRONTEND - MIDDLE-END - BACKED 

- we need an intermediate layer between the client side and the microservices
- Using this middle end, when client sends request we will be able to make decision that which microservices should actually respond to this request
- We can do message validation, response transformation, rate limiting
- We try to prepare an API Gateway that acts as this middle end.
  