const config = require('config');
const request = require('request');

const BASE_URL = config.get('nia-ac.baseUrl');
const PATH = config.get('nia-ac.path');

const assistentecognitivo = {
  enviarAC: (dados, corpus) => (new Promise((fulfill, reject) => {
    request(
      {
        method: 'POST',
        url: `${BASE_URL}${PATH}/${corpus}`,
        json: dados,
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode === 200) {
          fulfill(body);
        } else {
          const errResponse = {
            statusCode: response.statusCode,
            body: response.body,
          };
          reject(errResponse);
        }
      },
    );
  })),
};
module.exports = assistentecognitivo;
