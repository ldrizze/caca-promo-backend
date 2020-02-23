const fs = require('fs');
const path = require('path');
const controllers = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const controller = require(path.join(__dirname, file));
    controllers[controller.controller_name] = controller;
  });

module.exports = controllers;