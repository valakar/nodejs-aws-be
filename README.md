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

## Task 6

## Evaluation criteria


Reviewers should verify the lambda functions, SQS and SNS topic and subscription in PR.

- [x]  **1** - File **serverless.yml** contains configuration for **catalogBatchProcess** function
- [ ]  **2** - File **serverless.yml** contains policies to allow lambda **catalogBatchProcess** function to interact with SNS and SQS
- [x]  **3** - File **serverless.yml** contains configuration for SQS **catalogItemsQueue**
- [ ]  **4** - File **serverless.yml** contains configuration for SNS Topic **createProductTopic** and email subscription

## Additional (optional) tasks
---

- [ ]  **+1** - **catalogBatchProcess** lambda is covered by **unit** tests
- [ ]  **+1** - set a Filter Policy for SNS **createProductTopic** in **serverless.yml** (Create an additional email subscription and distribute messages to different emails depending on the filter for any product attribute)

***
##### Link to FE repository 
[Task6 Pull Request](https://github.com/valakar/nodejs-aws-fe/pull/5)

***
##### Deployed applications
[Cloudfront](https://d1jpnfaozgam1v.cloudfront.net/)

***
##### Documentation
[Swagger](https://app.swaggerhub.com/apis/valakar/NodeAWSBE/0.0.3) - all requests should work
