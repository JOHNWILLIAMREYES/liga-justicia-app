const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.get('/pokeApi/:pokemon_id', (req, res) => {
  const {
    params: { pokemon_id },
  } = req;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  //   res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
