_<p style="text-align: center;">Project deployment and hosting</p>_

### Summary
CivicTechJobs is hosted on the Incubator AWS account, which is managed by the DevOps CoP. The application is deployed through Fargate, which itself deploys the CivicTechJob docker image. This repo sends updates to the Incubator through a github action `deploy-stage.yml`.

Incubator aws resources are managed using terraform files which are commited to the [Incubator Source](https://github.com/hackforla/incubator/tree/main/terraform/projects/civic-tech-jobs)

The resources used by CTJ include: a database, a DNS entry, a fargate task definition, and a fargate task


### Github Action
Github actions are the mechanism used to convey changes in this CivicTechJobs repo to the AWS deployment. The deploy-stage action is set to run on any updates to the main branch. On run the action will assume an AWS credential, push the newest docker image to the ECR, then force a ECS-Fargate redeployment. This process will depend on OIDC to grant AWS permissions for its execution 

### Regarding Environment Variables
The combination of Fargate(a managed service from AWS) and terraform means that environment variables are passed into the application differently than when the application is run locally. The environment variables are set in terraform at the following [location](https://github.com/hackforla/incubator/blob/main/terraform/projects/civic-tech-jobs/environment-stage.tf).
Note that these variables are the same as those found in this repo's [env.example](https://github.com/hackforla/CivicTechJobs/blob/develop/dev/dev.env.example)

Some values will come from the terraform modules, but in essense if you must add or edit environment variables for the application in deployment, you will need to change them in Incubator.

### DNS
The staging environment is current set to run at: https://stage.civictechjobs.org/
