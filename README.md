# Swagat's [TodoApp](https://todoapp.swagatkumar.net/)

This project was created using [AWS Amplify](https://aws.amazon.com/amplify/).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install Node Modules

### `amplify init`

Initialise a default amplify project

### `amplify add auth`

Add Amazon Cognito Auth to your App

### `amplify add api`

Choose GraphQL Todo Api with the following Schema :

```graphql
type Todo @model @auth(rules: [{ allow: owner }]) {
	id: ID!
	text: String!
	done: Boolean!
}
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
