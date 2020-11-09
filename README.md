# Backend repository for VShop

## Table of contents
* [Setup](#setup)
* [Task 4](#task-4)

## Setup
To run this project, install it locally using npm:

```
$ npm install
```

To deploy *product-service* run:
```
$ cd product-service && npm run deploy 
```

## Task 4

#### EVALUATION CRITERIA
- [x]  **1** - Task 4.1 is implemented
- [x]  **3** - TASK 4.2 is implemented lambda links are provided and returns data
- [x]  **4** - TASK 4.3 is implemented lambda links are provided and products is stored in DB (call TASK 4.2 to see the product)
- [x]  **5** - Your own Frontend application is integrated
with product service (/products API) and products from product-service
are represented on Frontend. Link to a working Front-End application is
provided for cross-check reviewer.
***

#### Additional (optional) tasks (but nice to have):
**Additional (optional) tasks (but nice to have):**

- [x]  **+1** - POST/products lambda functions returns error 400 status code if product data is invalid
- [x]  **+1** - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
- [x]  **+1** - All lambdas do console.log for each incoming requests and their arguments
- [x]  **+1** - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa) ([https://devcenter.kinvey.com/nodejs/tutorials/bl-transactional-support](https://devcenter.kinvey.com/nodejs/tutorials/bl-transactional-support))

***
##### Link to FE repository 
[Task4 Pull Request](https://github.com/valakar/nodejs-aws-fe/pull/3)

***
##### Deployed applications
[Cloudfront](https://d232a2m5r21slj.cloudfront.net/)

***
##### Documentation
[Swagger](https://app.swaggerhub.com/apis/Lelou/NodeAWSBE/0.0.2) - all requests should work
