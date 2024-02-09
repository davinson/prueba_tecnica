import { Product } from "./Product";
import { Role } from "./Role";
import { Warehouse } from "./Warehouse";
import { User } from "./User";
import { Item } from "./Item";
import { Movement } from "./Movement";

User.belongsTo(Role);

Role.belongsTo(User);

Product.belongsToMany(Warehouse, { through: "Item" });

Warehouse.belongsToMany(Product, { through: "Item" });

export { User, Role, Product, Warehouse, Item, Movement };
