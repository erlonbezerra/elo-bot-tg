const log = require('loglevel');

const tradutor = {
  traduzirBorda: async (idUsuario, data) => {
    new Promise((fulfill) => {
      const retorno = data.message.text;
      fulfill(retorno);
    }).catch(error => log.error(error));
  },
  traduzirAC: async (dados, idCanal) => {
    try {
      const idUsuario = dados.from.id;
      const data = {
        sender: {
          id: `${idUsuario}:${idCanal}`,
        },
        recipient: {
          id: '783094697',
        },
        timestamp: `${dados.date}`,
        message: {
          mid: `${idUsuario}`,
          text: dados.text,
        },
      };
      return data;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = tradutor;
