import { Product } from "../models/Product";
import { catchErrors } from "../errors/error-catcher";


export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    
  }

  type Query {
    getProduct(id: ID!) : Product
    getProducts: [Product]
  }

  type Mutation {
  addProduct(name: String!, price: Float!): Product
  updateProduct(id: ID!, name: String, price: Float): Product
  deleteProduct(id: ID!):Boolean
}
`;

export const resolvers = {
  Query: {
    getProducts: catchErrors(async () => {
      return await Product.findAll();
    }),
    getProduct: catchErrors(async (id) => {
    const product= await Product.findByPk(id);
    return await product;
    }),
  },
  Mutation: {
    addProduct: catchErrors(async (_, { name, price }) => {
      return await Product.create({ name, price });
    }),
    updateProduct: catchErrors(async (_, { id ,name,price}) => {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      if (name) product.name=name;
      if (price) product.price=price;
      return await product.save({ name, price});
    }),
    deleteProduct: catchErrors(async (_, { id }) => {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      await product.destroy();
      return true; 
    }),
  },
};
