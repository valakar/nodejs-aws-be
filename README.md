# Backend repository for VShop

## Table of contents
* [Setup](#setup)
* [Task 3](#task-3)

## Setup
To run this project, install it locally using npm:

```
$ npm install
```

To deploy *product-service* run:
```
$ cd product-service && npm run deploy 
```

## Task 3

#### EVALUATION CRITERIA

1 - product-service serverless.yml contains configuration for 2 lambda functions, API is not working at all, but YAML configuration is correct

```
  functions: {
    getProductList: {
      handler: 'handler.getProductList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    getProductById: {
      handler: 'handler.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            cors: true
          }
        }
      ]
    }
  }
```

2 - The getProductsList OR getProductsById lambda function returns a correct response (POINT1)
```
GET https://lpeipbrbk3.execute-api.eu-west-1.amazonaws.com/dev/products
RESPONSE Product[]
[
    {
        "count": 4,
        "description": "Short Product Description1",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 2.4,
        "title": "ProductOne"
    },
    ...
]
```
3 - The getProductsById AND getProductsList lambda functions return a correct response code (POINT2)
```
GET https://lpeipbrbk3.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa
RESPONSE Product
{
    "count": 4,
    "description": "Short Product Description1",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "price": 2.4,
    "title": "ProductOne"
}
```
4 - Your own Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. AND POINT1 and POINT2 are done.

[ApplicationLink](https://d232a2m5r21slj.cloudfront.net/) - please check network tab

***

#### Additional (optional) tasks (but nice to have):

+1 - Async/await is used in lambda functions
```
Not used yet - PR will be updated
```

+1 - ES6 modules are used for product-service implementation
```
Typescript was used alongside with ES6 modules
```

+1 - Webpack is configured for product-service
```
Please check webpack.config.js
```

+1 - SWAGGER documentation is created for product-service
```
Not created yet - PR will be updated
```

+1 - Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered) (You may use JEST)
```
Not covered yet - PR will be updated
```

+1 - Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
```
./src/handlers/get-product-list.ts
./src/handlers/get-product-by-id.ts
```

+1 - Main error scenarious are handled by API ("Product not found" error, try catch blocks are used in lambda handlers).
```
Not created yet - PR will be updated
```

***
##### Link to FE repository 
[Task3 Pull Request](https://github.com/valakar/nodejs-aws-fe/pull/2)

***
##### Deployed applications
[Cloudfront](https://d232a2m5r21slj.cloudfront.net/)
