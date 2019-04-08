module.exports.getInfo = getInfo;
module.exports.getInfo2 = getInfo2;
module.exports.getInfo3 = getInfo3;
module.exports.getInfo4 = getInfo4;

const chalk = require('chalk');
const request = require('request');

const _search = 'https://collectionapi.metmuseum.org/public/collection/v1/search'
const _item = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

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
            callback(undefined, body);
        }

    });
}

function getInfo(line, callback) {
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
                    let item = {
                        artist: response.constituents[0].name,
                        title: response.title,
                        year: response.objectEndDate,
                        technique: response.medium,
                        metUrl: response.objectURL
                    };
                    callback(undefined, item);
                }
            });
        }
    });
}

function getInfo2(line, callback) {
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
                    let item = {
                        title: response.title,
                        image: response.primaryImage,
                        image_small: response.primaryImageSmall,
                        other_images: response.additionalImages,
                        metUrl: response.objectURL
                    };
                    callback(undefined, item);
                }
            });
        }
    });
}

function getInfo3(line, callback) {
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
                    let item = {
                        title: response.title,
                        objectDate: response.objectDate,
                        objectBeginDate: response.objectBeginDate,
                        objectEndDate: response.objectEndDate,
                        metUrl: response.objectURL
                    };
                    callback(undefined, item);
                }
            });
        }
    });
}

function getInfo4(line, callback) {
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
                    let item = {
                        title: response.title,
                        role: response.artistRole,
                        prefix: response.artistPrefix,
                        name: response.artistDisplayName,
                        bio: response.artistDisplayBio,
                        suffix: response.artistSuffix,
                        nationality: response.artistNationality,
                        begin_date: response.artistBeginDate,
                        metUrl: response.objectURL
                    };
                    callback(undefined, item);
                }
            });
        }
    });
}