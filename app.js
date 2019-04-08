const met = require('./met')
const path = require('path')
const express = require('express')

const app = express()
var port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public')

const chalk = require('chalk');
const ora = require('ora');
const spinner = ora('Obteniendo información');
spinner.color = 'yellow';

app.get('/students', function (req, res) {
  spinner.start();
  res.send(
    {
      'error': 'Tienes que ingresar un ID válido. Ej. /students/A00818997'
    }
  );
  spinner.stop();
});

app.get('/students/:id', function (req, res) {
  if (!req.params.id) {
    return res.send({
      error: 'Tienes que dar un id'
    });
  }
  spinner.start();
  res.send(
    {
      "id": req.params.id,
      "fullname": "Enrique Gacia Torres",
      "nickname": "kachus",
      "age": 21
    }

  );
  spinner.stop();
});

app.get('/met', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Tienes que dar un parametro de busqueda. Ej. /met?search=Leonardo'
    });
  }
  spinner.start();
  met.getInfo(req.query.search, function (error, response) {
    if (error) {
      spinner.stop();
      console.log(chalk.bgRed.bold('\n ' + error));
      return res.send({
        error: error
      });
    }
    spinner.stop();
    res.send({
      searchTerm: req.query.search,
      artist: response.artist,
      title: response.title,
      year: response.year,
      technique: response.technique,
      metUrl: response.metUrl
    });
  });
});


app.get('*', function (req, res) {
  res.send({
    error: 'Esta ruta no existe. Intenta: /students/:id ó /met'
  });
});

app.listen(port, function () {
  console.log(chalk.blue.bold('\n Listo para recibir peticiones\n'));
  console.log(chalk.green(' Ejemplo:\n http://localhost:3000/met?search=Leonardo'));
});