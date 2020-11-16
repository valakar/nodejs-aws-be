# Backend repository for VShop

## Table of contents
* [Setup](#setup)
* [Task 5](#task-5)

## Setup
To run this project, install it locally using npm:

```
$ npm install
```

To deploy *product-service* run:
```
$ cd product-service && npm run deploy 
```

## Task 5

## Evaluation criteria
---

Reviewers should verify the lambda functions by invoking them through provided URLs.

- [x]  **1** - File **serverless.yml** contains configuration for **importProductsFile** function
- [x]  **3** - The **importProductsFile** lambda function returns a correct response which can be used to upload a file into the **S3** bucket
- [x]  **4** - Frontend application is integrated with **importProductsFile** lambda
- [x]  **5** - The **importFileParser** lambda function is implemented and **serverless.yml** contains configuration for the lambda

## Additional (optional) tasks

- [x]  **+1** - **async/await** is used in lambda functions
- [x]  **+1** - **importProductsFile** lambda is covered by **unit** tests (**aws-sdk-mock** can be used to mock S3 methods - [https://www.npmjs.com/package/aws-sdk-mock](https://www.npmjs.com/package/aws-sdk-mock))
- [x]  **+1** - At the end of the **stream** the lambda function should move the file from the **uploaded** folder into the **parsed** folder (move the file means that file should be copied into **parsed** folder, and then deleted from **uploaded** folder)
***
##### Link to FE repository 
[Task4 Pull Request](https://github.com/valakar/nodejs-aws-fe/pull/3)

***
##### Deployed applications
[Cloudfront](https://d1jpnfaozgam1v.cloudfront.net/)

***
##### Documentation
[Swagger](https://app.swaggerhub.com/apis/valakar/NodeAWSBE/0.0.3) - all requests should work
