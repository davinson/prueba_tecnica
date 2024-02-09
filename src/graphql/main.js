import { Product } from "../models/Product";
//import { catchErrors } from "../errors/error-catcher";
import { Warehouse } from "../models/Warehouse"
import jwt from "jsonwebtoken";
import { User } from "../models/index";
import { config } from "../config";
import {Item} from "../models/Item"

export const typeDefs = `
type Product {
    id: ID!
    name: String!
    price: Float!
    items: [Item]
  }

  type Warehouse{
  id: ID!,
  name: String!,
  capacity: Float!
   items: [Item]
}

 type Item{
    id: ID!
    warehouse:  Warehouse!
    product : Product!
  }

  type Role {
    id: ID!
    name: String!
    level: Int!
  }

 
type User {
    id: ID!
    username: String!
    password: String!
    access_token: String
    status: Boolean!
    role: Role!
  }

  type Movement{
    id: ID!
    date: String!
    origin: Int
    destination: Int
    product: Int
    quantity: Int
  }

  type Query {
    getProducts: [Product!]!
    getWarehouses: [Warehouse!]!
    getRoles: [Role]
    getRol(id: ID!) : Role!
    items: [Item!]!
  }

  type Mutation {
  addProduct(name: String!, price: Float!, warehouseId: Int!): Product
  updateProduct(id: ID!, name: String, price: Float, warehouseId: Int!): Product
  deleteProduct(id: ID!):Boolean
  addWarehouse(name: String!, capacity: Float!): Warehouse
  updateWarehouse(id: ID!, name: String, capacity: Float): Warehouse
  deleteWarehouse(id: ID!):Boolean
  login(username: String!, password: String!): AuthPayload!
  register(username: String!, password: String!,status: Boolean,role :Int) : User 
}

type AuthPayload {
    token: String!
    user: User!
  }
`;

export const resolvers = {
  Query: {
     getProducts: (async () => {
      return await Product.findAll();
    }),
    getWarehouses: (async () => {
      return await Warehouse.findAll();
    }), 
  },
  Mutation: {
    register: (async (_, { username, password ,status,role}) => {
      const user = await User.findOne({ where: { username: username } });
      if (user) {
        throw new Error('El  usuario existe');
      }
      return await User.create({ username, password ,status, role});
    }),
    addProduct: (async (_, { name, price, warehouseId }) => {
      const warehouse = await Warehouse.findOne({ where: { id: warehouseId } });
      if (!warehouse) {
        throw new Error('El almacén no existe');
      }
      const items = await Item.findAll({ where: { warehouse: warehouseId } });
      const total = items.reduce((sum, item) => sum + item.product.price, 0);
      if (total + args.price > warehouse.capacity) {
        throw new Error('El almacén no tiene capacidad suficiente');
      }
     const product= await Product.create({ name, price });
      pid = product[0].id;
      await Item.upsert({ warehouse: warehouseId, product: pid });
      return product;
    }),
    updateProduct: (async (_, { id, name, price }) => {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      if (name) product.name = name;
      if (price) product.price = price;
      return await product.save({ name, price });
    }),
    deleteProduct: (async (_, { id }) => {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      await product.destroy();
      return true;
    }),
    addWarehouse: (async (_, { name, capacity }) => {
      return await Warehouse.create({ name, capacity });
    }),
    updateWarehouse: (async (_, { id, name, capacity }) => {
      const warehouse = await Warehouse.findByPk(id);
      if (!warehouse) {
        throw new Error(`Bodega con ID ${id} no encontrado.`);
      }
      if (name) warehouse.name = name;
      if (capacity) warehouse.capacity = capacity
      return await warehouse.save({ name, capacity });
    }),
    deleteWarehouse: (async (_, { id }) => {
      const warehouse = await Warehouse.findByPk(id);
      if (!warehouse) {
        throw new Error(`Bodega con ID ${id} no encontrado.`);
      }
      await warehouse.destroy();
      return true;
    }),
    login: (async (_, { username, password }, context) => {
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
}
