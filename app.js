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

app.get('/images', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Tienes que dar un parametro de busqueda. Ej. /images?search=Leonardo'
    });
  }
  spinner.start();
  met.getInfo2(req.query.search, function (error, response) {
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
      title: response.title,
      image: response.image,
      image_small: response.image_small,
      other_images: response.other_images,
      metUrl: response.metUrl
    });
  });
});

app.get('/dates', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Tienes que dar un parametro de busqueda. Ej. /images?search=Leonardo'
    });
  }
  spinner.start();
  met.getInfo3(req.query.search, function (error, response) {
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
      title: response.title,
      objectDate: response.objectDate,
      objectBeginDate: response.objectBeginDate,
      objectEndDate: response.objectEndDate,
      metUrl: response.metUrl
    });
  });
});

app.get('/artist', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Tienes que dar un parametro de busqueda. Ej. /images?search=Leonardo'
    });
  }
  spinner.start();
  met.getInfo4(req.query.search, function (error, response) {
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
      title: response.title,
      role: response.role,
      prefix: response.prefix,
      name: response.name,
      bio: response.bio,
      suffix: response.suffix,
      nationality: response.nationality,
      begin_date: response.begin_date,
      metUrl: response.metUrl
    });
  });
});

app.get('*', function (req, res) {
  res.send({
    error: 'Esta ruta no existe. Intenta: /students/:id | /met | /images | /dates | /artist'
  });
});

app.listen(port, function () {
  console.log(chalk.blue.bold('\n Listo para recibir peticiones\n'));
  console.log(chalk.green(' Ejemplo:\n http://localhost:3000/met?search=Leonardo \n http://localhost:3000/images?search=Leonardo \n http://localhost:3000/students/A00818997\n http://localhost:3000/dates?search=Leonardo \n http://localhost:3000/artist?search=Leonardo'));
});