import { catchErrors } from "../errors/error-catcher";
import {Warehouse} from "../models/Warehouse"


export const typeDefs = `#graphql

type Warehouse{
  id: ID!,
  name: String!,
  capacity: Float!
}

type Query {
    getWarehouse(id: ID!) : Warehouse
    getWarehouses: Warehouse
  }

  type Mutation {
  addWarehouse(name: String!, capacity: Float!): Warehouse
  updateWarehouse(id: ID!, name: String, capacity: Float): Warehouse
  deleteWarehouse(id: ID!):Boolean
}
`;

export const resolvers = {
  Query: {
    getWarehouses: catchErrors(async () => {
      return await Warehouse.findAll();
    }),
    getWarehouse: catchErrors(async (id) => {
      const Ware= await Warehouse.findByPk(id);
      return Ware;
    }),
  },
  Mutation: {
    addWarehouse: catchErrors(async (_, { name, capacity }) => {
      return await Warehouse.create({ name, capacity });
    }),
    updateWarehouse: catchErrors(async (_, { id, name, capacity }) => {
      const warehouse = await Warehouse.findByPk(id);
      if (!warehouse) {
        throw new Error(`Bodega con ID ${id} no encontrado.`);
      }
      if (name) warehouse.name = name;
      if (capacity) warehouse.capacity = capacity
      return await warehouse.save({ name, capacity });
    }),
    deleteWarehouse: catchErrors(async (_, { id }) => {
      const warehouse = await Warehouse.findByPk(id);
      if (!warehouse) {
        throw new Error(`Bodega con ID ${id} no encontrado.`);
      }
      await warehouse.destroy();
      return true;
    }),
  },
};
