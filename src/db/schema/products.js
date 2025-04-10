import { mysqlTable, int, varchar, text, double, timestamp } from "drizzle-orm/mysql-core";

export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: double('price').notNull(),
  imageUrl: varchar('image_url', { length: 255 }),
  category: varchar('category', { length: 255 }).notNull(),
  stock: int('stock').notNull().default(0),
  status: varchar('status', { length: 255 }).notNull().default('disponivel'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
