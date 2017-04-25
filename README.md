<img src="https://neap.co/img/neap_black_small_logo.png" alt="Neap Pty Ltd logo" title="Neap" align="right" height="50" width="120"/>

# GraphiQL For Google Cloud Functions
## Table Of Content
* [TL;DR](#tldr)
* [Overview](#overview)
* [Step A - Configure Your Google Cloud Functions Environment](#step-a---create-a-new-google-cloud-functions-on-gcp)
* [Step B - Configure Your Local Machine](#step-b---configure-your-local-machine)
* [Step C - Create & Deploy your GraphQl dummy API](#step-c---create--deploy-your-graphql-dummy-api-from-your-local-machine)
* [This Is What We re Up To](#this-is-what-we-re-up-to)
* [Annexes](#annexes)
  - [A.1. Options Details](#a1-options-details)
  - [A.2. List Of Dependencies](#a2-list-of-dependencies)
  - [A.3. GraphQl Code Details](#a3-graphql-code-details)
  - [A.4. Why You Need To Add ``` npm dedupe ``` As a Post Install Hook](#a4-why-you-need-to-add-npm-dedupe-as-a-post-install-hook)

## TL;DR
If you're already familiar with Google Cloud Functions, GraphQl, and GraphiQl, then this TL;DR might be good enough. Otherwise, jump to the next [Overview](#overview) section, and follow each steps.
#### Installation
```bash
npm install graphql google-graphql-functions --save
```
#### In your Google Cloud Function index.js:

Replace:
```js
exports.helloWorld = function(req, res) { ... }
```
with:
```js
const graphQl = require('google-graphql-functions');

const executableSchema = ... // schema you should have built using the standard graphql.js or Apollo's graphql-tools.js.
const graphql_options = {
    schema: executableSchema, 
    graphiql: true,
    endpointURL: "/graphiql"
};

exports.helloWorld = graphQl.serveHTTP(graphql_options, (req, res, results) => {
    //Some code to inspect req, res, or results
});
```

#### WARNING
In the piece of code above, you won't be able to do a ``` res.status(200).send("Hello World") ``` as the http header will already be set the graphQl interpreter. This is a GraphQl server. Therefore, it only returns GraphQl responses. If you need to manipulate data, you will have to do this inside the resolver. This is beyond the scope of this document. You can find a simple example below, under the [Step C](#step-c---create-&-deploy-your-graphql-dummy-api-from-your-local-machine), and read more about it on the awesome [Apollo's website](http://dev.apollodata.com/tools/), as well as on the official Facebook [GraphQl website](http://graphql.org/learn/). 


## Overview
In this brief 3 steps guide, you will:
* A - [Configure Your Google Cloud Functions Environment](#step-a---create-a-new-google-cloud-functions-on-gcp)
* B - [Configure Your Local Machine](#step-b---configure-your-local-machine)
* C - [Build & Deploy your GraphQl dummy API](#step-c---create--deploy-your-graphql-dummy-api-from-your-local-machine)

**google-graphql-functions** will help you deploy your first dummy GraphQl API to a Google Cloud Functions endpoint. The data are hardcoded for the sake of brevity, but you could easily replace that bit of code with your own DB or external APIs requests. 

Beyond just querying GraphQl, **google-graphql-functions** will also allow you to expose a [GraphiQl UI](https://github.com/graphql/graphiql) to help develop, test, and collaborate. This project has been forked from the excellent [express-graphql](https://github.com/graphql/express-graphql) package.

If you're only interested in knowing how to program GraphQl APIs for Google Cloud Functions and are already familiar with developing and deploying code for Google Cloud Functions, then jump straight to [Step C - Create & Deploy your GraphQl dummy API](#step-c---create--deploy-your-graphql-dummy-api-from-your-local-machine).

## Step A - Create a New Google Cloud Functions On GCP
**1** - Create a Google Account & log in to your [Google Cloud Console](https://console.cloud.google.com).

**2** - Select or create a new Project (if this concept is not familiar, please visit this [link](https://cloud.google.com/resource-manager/docs/creating-managing-projects)).

**3** - Create your first Google Cloud Function (if the Google Cloud Console UI hasn't change, this should be in the left burger menu, under **Compute**). The details of your configuration don't really matter here, as we will override them later in stage B. Just make sure you select the _HTTP trigger_ under the **Trigger** section.

**4** - Copy the following information:
* _**Name**_: Name of your Google Cloud Function.
* _**Bucket**_: The name of the Google Cloud Storage's bucket. A _bucket_ is a piece of storage that can old various document. In our case, those documents will be ZIP files representing each deployment. This could for example allow you to revert your code in case your latest deployement (latest ZIP) contains bugs.

## Step B - Configure Your Local Machine 
**1** - Make sure your have the following tools installed on your machine:
* _**node**_: Make sure you have the latest version.
* _**npm**_: Make sure you have the latest version.
* [_**gcloud**_](https://cloud.google.com/sdk/gcloud/): Installation steps [here](https://cloud.google.com/sdk/downloads).
* _**gcloud beta**_: 

  **``` gcloud components install beta ```**
* [_**Google Cloud Functions Emulator**_](https://github.com/GoogleCloudPlatform/cloud-functions-emulator)(allows to deploy your GCF locally for dev. purposes): 

  **``` npm install -g @google-cloud/functions-emulator ```**

**2** - Configure your system:
* Make sure you have the latest gcloud components: 

  **``` gcloud components update ```**
* Connect gcloud to your Google account: 

  **``` gcloud init ```**
* Check which [Google Cloud Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) is currently you default gcloud project: 

  **``` gcloud config list ```**
* If the value listed under _project_ is not equal to the project you set up in [Step A.2](#step-a---create-a-new-google-cloud-functions-on-gcp), set it up by executing: 

  **``` gcloud config set project [YOUR-PROJECT-ID] ```**

## Step C - Create & Deploy your GraphQl dummy API From Your Local Machine
**1** - Create a new Google Could Functions Project
```bash
mkdir graphql-cloud-function
cd graphql-cloud-function
touch index.js
npm init
```
**2** - Load dependencies
```bash 
npm install graphql graphql-tools google-graphql-functions lodash --save
```
_More details on those dependencies in annex [A.2. List Of Dependencies](#a2-list-of-dependencies)_

**3** - Paste this demo code into the index.js
```js
const graphQl = require('google-graphql-functions');
const _ = require('lodash');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const schema = `
type Product {
  brandRefId: String!
  id: ID!
  name: String!
  shortDescription: String
}

type Query {

  # ### GET the product that matches this id
  #
  # _Arguments_
  # - **id**: ID of the object
  productById(id: Int!): Product

  # ### GET the products for a specific brand 
  #
  # _Arguments_
  # - **brandRefId**: Reference ID of the brand
  productsByBrand(brandRefId: String!): [Product]
}

schema {
  query: Query
}
`;

const productResolver = {

    root: {
        Query: {
            productById(root, { id }, context) {
                return findBy('id', id).then(product => {
                    return product ? product[0] : [];
                });
            },

            productsByBrand(root, { brandRefId }, context) {
                return findBy('brandRefId', brandRefId);
            }
        }
    }
}

// This `findBy` method simulates a database query, hence it returning a promise.
const findBy = (field, value) => Promise.resolve(product.filter(product => product[field] === value));

const product = [{
    name: 'Magic Wand',
    id: 1,
    brandRefId: 'm1',
    shortDescription: "Piece of wood with some magic shenanigan."
}, {
    name: 'Catapult',
    id: 2,
    brandRefId: 'm2',
    shortDescription: "Contraption that throws heavy rocks at my ennemy's face."
}, {
    name: 'Wig',
    id: 3,
    brandRefId: 'm2',
    shortDescription: "Weird thing I wear when I'm drunk."
}];


const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: _.merge(productResolver.root) // merge using lodash, for example
});

const graphql_options = {
    schema: executableSchema,
    graphiql: true,
    endpointURL: "/graphiql"
};

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.main = graphQl.serveHTTP(graphql_options, (req, res, results) => {
    //Some code to inspect req, res, or results
});

// WARNING:
// In the piece of code above, you won't be able to do a 'res.status(200).send("Hello World")' 
// as the http header will already be set the graphQl interpreter. This is a GraphQl server. 
// Therefore, it only returns GraphQl responses. If you need to manipulate data, you will have to 
// do this inside the resolver. This is beyond the scope of this document. You can find a simple 
// example below, under the Step C, and read more about it on the awesome Apollo's website 
// (http://dev.apollodata.com/tools/), as well as on the official Facebook GraphQl website 
// (http://graphql.org/learn/).
```
_More details on the code above in annex [A.3. GraphQl Code Details](#a3-graphql-code-details)_

**4** - Test this code locally:

*(Make sure you've installed the 'Google Cloud Functions Emulator' as explained in [Step B.1](#step-b---configure-your-local-machine))*
* Start your local Google Cloud Functions server: **``` functions start ```**
* Deploy your code to the local server: **``` functions deploy main --trigger-http ```**
* Copy the URL displayed in the terminal, and append to it the endpointURL defined in the code above. This should look like [http://localhost:8010/[PROJECT-ID]/us-central1/main/graphiql](http://localhost:8010/[PROJECT-ID]/us-central1/main/graphiql). Your browser should return the GraphiQL UI, and you should be able to start querying. As you're running queries in the UI, you'll notice that the URL's query string automatically updates. This is the actually GraphQl query. To test what a normal client would receive, simply remove the /graphiql in the URL, and you should receive a JSON object. 

**5** - Deploy your code to your Google Cloud Function on GCP

*(Make sure you've installed the 'gcloud beta' as explained in [Step B.1](#step-b---configure-your-local-machine))*

The steps to deploy:

* Add the following in your package.json (more details on why we need this in annex [A.4. Why You Need To Add ``` npm dedupe ``` As a Post Install Hook](#a4-why-you-need-to-add-npm-dedupe-as-a-post-install-hook)):
  ```js
  "scripts": {
  	"postinstall": "npm dedupe"
  }
  ```
* Get your Google Cloud Function from [Step A.4](#step-a---create-a-new-google-cloud-functions-on-gcp), and execute the following:

  ```bash
  gcloud beta functions deploy [FUNCTION-NAME] --stage-bucket [BUCKET-NAME] --trigger-http --entry-point main
  ```
## This Is What We re Up To
We are Neap, an Australian Technology consultancy powering the startup ecosystem in Sydney. We simply love building Tech and also meeting new people, so don't hesitate to connect with us at [https://neap.co](https://neap.co).

## Annexes
### A.1. Options Details
```js
const options = {
  schema: "Object"
  graphiql: "Boolean"
  endpointURL: "String"
  rootValue: "Object"
  context: "Object"
  pretty: "Boolean"
  formatError: "Object"
  extensions: "function"
  validationRules: "Object"
};
```
- schema: A GraphQLSchema instance from GraphQL.js. A schema must be provided.
- graphiql: If true, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
- endpointURL: If 'graphiql' is on, then whatever path you define here will allow to serve an HTML page with the GraphiQl UI. Leaving that blanck will serve the GraphiQL UI on the root path, which will prevent any client to actually retrieve the data in a JSON format. That's why it is recommended to define this field.
- rootValue: A value to pass as the rootValue to the graphql() function from GraphQL.js.
- context: A value to pass as the context to the graphql() function from GraphQL.js. If context is not provided, the request object is passed as the context.
- pretty: If true, any JSON response will be pretty-printed.
- formatError: An optional function which will be used to format any errors produced by fulfilling a GraphQL operation. If no function is provided, GraphQL's default spec-compliant formatError function will be used.
- extensions: An optional function for adding additional metadata to the GraphQL response as a key-value object. The result will be added to "extensions" field in the resulting JSON. This is often a useful place to add development time metadata such as the runtime of a query or the amount of resources consumed. This may be an async function. The function is give one object as an argument: { document, variables, operationName, result }.
- validationRules: Optional additional validation rules queries must satisfy in addition to those defined by the GraphQL spec.

### A.2. List Of Dependencies 

- [graphql.js](https://github.com/graphql/graphql-js): This is the official Facebook GraphQl lib. Most of the open-source tools you'll encounter are built on top of it.
- [graphql-tools.js](https://github.com/apollographql/graphql-tools): This is the [Apollo GraphQl](http://dev.apollodata.com/) tools. Apollo is an awesome set of tools built on top of graphql.js that *"make open source software and commercial tools to help developers use GraphQL"*. Specifically, graphql-tools.js make building GraphQl schemas and building resolvers less of a pain than using vanilla graphql.js.
- [google-graphql-functions.js](https://github.com/nicolasdao/google-graphql-functions): Our sugar code that glues the Google Cloud Functions node.js server to your standard GraphQl schema. It also exposes a [GraphiQl UI](https://github.com/graphql/graphiql) (if the option graphiql is set to true), which is darn useful when developing your API, or if you want to expose your API to collaborators. Not only will they access great documentation out-of-the-box, they will also be able to query your GraphQl API with a nice auto-complete (try a live demo [here](https://graphql.org/swapi-graphql/)). 
- [lodash.js](https://github.com/lodash/lodash): *"A modern JavaScript utility library delivering modularity, performance, & extras."*. Usually used to perform functional style programming. Trying it is loving it. 

### A.3. GraphQl Code Details
In the above [index.js](#step-c---create--deploy-your-graphql-dummy-api-from-your-local-machine):
* We've created a GraphQl 'schema'. It is a string, but this is just an opiniated implementation from the Apollo team (i.e. graphql-tools.js). graphql.js choosed a more programmatic approach.
* We've then created a resolver called 'productResolver', that interprets the GraphQl query so that you can query your backend, whatever it is (e.g. DB, other APIs, ...). In this example, we only have one resolver, but you can have as many as you need. That's why we have the line of code '_.merge(productResolver.root)'.
* Now that we have both a schema and all the resolvers, we can actually create an 'Executable Schema'. This is where the magic happens.
* Finally, we've packaged all of this into our GraphiQL tool (google-graphql-functions.js) so that we have an option to expose the Facebook GraphiQL UI to ease development, testing, and collaboration. More details about the section called [Option Details](#a1-options-details).

### A.4. Why You Need To Add ``` npm dedupe ``` As a Post Install Hook 
As of today (Apr 17), the current stable version of node is v7.8.0, which stopped using nested dependencies inside the node_modules. However, Google Cloud Functions still runs using node v6.9.1, which still uses nested dependencies. The issue is that our code will then contains more than one graphql.js package which will result in this weird bug: 

*`Schema must be an instance of GraphQLSchema. Also ensure that there are not multiple versions of GraphQL installed in your node_modules directory.`*

To fix this, we need to run **``` npm dedupe ```** after **``` npm install ```**. 
