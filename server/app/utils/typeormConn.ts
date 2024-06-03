import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "@/setting";
import { User } from "@/Users/users.entity";

export const dataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, "./app/**/*.entity.{ts,js}"],
  timezone: "Asia/Seoul",
  charset: "utf8mb4",
  synchronize: true,
  logging: true,
  connectTimeout: 10000,
  poolSize: 1000,
});

dataSource
  .initialize()
  .then((connection) => {
    // here you can start to work with your entities
    console.log("connect database");
  })
  .catch((error) => console.error(error));
