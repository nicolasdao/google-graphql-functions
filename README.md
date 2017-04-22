# GraphiQL For Google Cloud Functions
## Options
```js
const options = {
	schema: "Object"
	graphiql: "Boolean"
	rootValue: "???"
	context: "Object"
	pretty: "Boolean"
	formatError: "???"
	extensions: "???"
	validationRules: '???'
};
```
- schema: A GraphQLSchema instance from GraphQL.js. A schema must be provided.
- graphiql: If true, presents GraphiQL when the GraphQL endpoint is loaded in a browser. We recommend that you set graphiql to true when your app is in development, because it's quite useful. You may or may not want it in production.
- rootValue: A value to pass as the rootValue to the graphql() function from GraphQL.js.
- context: A value to pass as the context to the graphql() function from GraphQL.js. If context is not provided, the request object is passed as the context.
- pretty: If true, any JSON response will be pretty-printed.
- formatError: An optional function which will be used to format any errors produced by fulfilling a GraphQL operation. If no function is provided, GraphQL's default spec-compliant formatError function will be used.
- extensions: An optional function for adding additional metadata to the GraphQL response as a key-value object. The result will be added to "extensions" field in the resulting JSON. This is often a useful place to add development time metadata such as the runtime of a query or the amount of resources consumed. This may be an async function. The function is give one object as an argument: { document, variables, operationName, result }.
- validationRules: Optional additional validation rules queries must satisfy in addition to those defined by the GraphQL spec.
