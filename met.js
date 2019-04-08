module.exports.getInfo = getInfo;

const chalk = require('chalk');
const request = require('request');

const _search = 'https://collectionapi.metmuseum.org/public/collection/v1/search'
const _item = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

function getInfo(line, callback){
    // Get objects
    getObjects(line, function (error, response) {
        if (error) {
            console.log(chalk.bgRed.bold('\n' + error));
            callback(error, undefined);
        } else {
            // Get Object
            getItem(response, function (error, response) {
                if (error) {
                    console.log(chalk.bgRed.bold('\n' + error));
                    callback(error, undefined);
                } else {
                    callback(undefined, response);
                }
            });
        }
    });
}

function getObjects(query, callback) {
    let url = `${_search}?q=${query}`;
    request.get({ url: url, json: true },
        function (error, response, body) {
            if (error) {
                callback('Hubo un error con el servicio del MET', undefined);
            }
            else if (response.statusCode != 200) {
                callback(`Error. Status Code: ${response.statusCode}\n ${body.message}`, undefined);
            }
            else if (body.total < 1) {
                callback('No se encontro un objeto relacionado', undefined);
            }
            else {
                callback(undefined, body.objectIDs[0]);
            }
        });
}

function getItem(query, callback) {
    let url = `${_item}${query}`;
    request({ url: url, json: true }, function (error, response, body) {
        if (error) {
            callback('Hubo un error con el servicio del MET', undefined);
        }
        else if (response.statusCode != 200) {
            callback(`Error. Status Code: ${response.statusCode}`, undefined);
        }
        else {
            let item = {
                artist: body.constituents[0].name,
                title: body.title,
                year: body.objectEndDate,
                technique: body.medium,
                metUrl: body.objectURL
            };
            callback(undefined, item);
        }

    });
}