import { catchErrors } from "../errors/error-catcher";
import {Role} from "../models/Role.js"


export const typeDefs = `#graphql
type Roles {
  id: ID!
  name: String!
  level: Number!
}

type Query {
    getRol(id: ID!) : Roles
    getRoles: [Roles]
  }

  type Mutation{
    addRole(name: String! ,level: Number!) : Roles
    updateRole(id: ID!, name: String! ,level: Number!) :Roles
    deleteRole(id: ID!): Boolean
  }
`;

export const resolvers = {

}
