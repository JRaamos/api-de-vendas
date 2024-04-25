import { DataSource } from "typeorm"

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  migrations: ["src/shared/typeorm/migrations/*.ts"],
})

export { PostgresDataSource }
