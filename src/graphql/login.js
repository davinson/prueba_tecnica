/* import { createRequire } from "module";
const jwt = createRequire("jsonwebtoken"); */
import * as jwt from "jsonwebtoken"
import { User } from "../models/index";
import { catchErrors } from "../errors/error-catcher";
import { config } from "../config";

export const userType = `#graphql
  type User {
    id: ID!
    username: String!
    password: String!
    access_token: String
    status: Boolean!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

export const resolvers = {
  Mutation: {
    login: catchErrors(async (_, { username, password }, context) => {
      const user = await User.findOne({ where: { username: username } });
      if (!user) throw new Error("No such user found");

      const valid = password === user.password;
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, config.secret);

      return {
        token,
        user,
      };
    }),
  },
};
