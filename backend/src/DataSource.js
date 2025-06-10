const { DataSource } = require("typeorm");
const Evento = require("./entity/Evento");
const TipoEvento = require("./entity/TipoEvento");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "KidCh0qu&",
  database: "eventplus",
  synchronize: true,
  entities: [Evento, TipoEvento], // <- precisa ser as entidades reais, não objetos vazios
});


module.exports = { AppDataSource };
