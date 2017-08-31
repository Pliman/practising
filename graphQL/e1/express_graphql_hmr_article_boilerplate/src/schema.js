import { makeExecutableSchema } from 'graphql-tools';

const RootQuery = `
  type RootQuery {
    hello_world: String!
    aaa: String!
   }
`;

const RootMutation = `
type RootMutation {
  addPrj(input: String!): String!
  deletePrj(input: String!): String!
 }
`;

// const RootSubscription = `
// type RootQuery {
//   hello_world: String!
//   aaa: String!
//  }
// `;

const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`;

export default makeExecutableSchema({
	typeDefs: [SchemaDefinition, RootQuery, RootMutation],
	resolvers: {
		RootQuery: {
      hello_world: () => 'Hi from GraphQL!!!',
      aaa: () => 'Hi aaa!!!'
    },
    RootMutation: {
      addPrj: (_, { input }) => `Project ${input} added`,
      // addPrj: (input) => `Project ${input} added`,
      deletePrj: (input) => `Project ${input} deleted`
    }
	}
});
