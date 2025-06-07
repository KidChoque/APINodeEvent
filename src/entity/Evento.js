const { EntitySchema } = require("typeorm");

const Evento = new EntitySchema({
  name: "Evento",
  tableName: "evento",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nome: {
      type: "varchar",
    },
    descricao: {
      type: "text",
    },
    nomeOrganizador: {
      type: "varchar",
    },
    cpfOrganizador: {
      type: "varchar",
    },
  },
  relations: {
    tipoEvento: {
      type: "many-to-one",
      target: "TipoEvento",
      joinColumn: true,
      eager: true,
    },
  },
});

module.exports = Evento;
