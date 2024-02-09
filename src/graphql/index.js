import { typeDefs as productTypeDefs, resolvers as productResolvers } from "./products";
import { typeDefs as warehouseTypeDefs, resolvers as warehouseResolvers } from "./warehouse"; 
import {userType,resolvers as LoginResolvers} from "./login"


 export const combinedTypeDefs = `
  ${productTypeDefs}
  ${warehouseTypeDefs}
  ${userType}
`;

export const combinedResolvers = {
  ...productResolvers,
  ...warehouseResolvers,
  ...LoginResolvers,
};
