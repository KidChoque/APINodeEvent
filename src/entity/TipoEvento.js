const { EntitySchema } = require("typeorm");

const TipoEvento = new EntitySchema({
  name: "TipoEvento",
  tableName: "tipo_evento",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nome: {
      type: "varchar",
    },
  },
  relations: {
    eventos: {
      type: "one-to-many",
      target: "Evento",
      inverseSide: "tipoEvento",
    },
  },
});

module.exports = TipoEvento;
