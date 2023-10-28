import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const init = async () => {
  const app = express();
  const PORT = 8000;

  app.use(express.json());

  // Create a GraphQL server
  const gqlServer = new ApolloServer({
    typeDefs: `
            type Query {
                hello: String,
                say(name: String): String,
            }
        `,
    resolvers: {
      Query: {
        hello: () => `Hello!! GraphQl server here.`,
        say: (_, { name }: { name: String }) =>
          `Hey ${name}!!, GraphQl server here.`,
      },
    },
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({
      message: "Server is running",
    });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
};

init();
