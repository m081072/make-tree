"use strict";
const Immutable = require('immutable');

exports.make = (commands) => {
  let makeTree = (commands, path) => {
    if (commands.length === 0) {
      return path;
    }
    let command = commands[0];
    let node = path.first();
    if (command.command === "begin") {
      let newNode = {};
      node[command.value] = newNode;
      return makeTree(commands.slice(1), path.push(newNode));
    }
    else if (command.command === "end") {
      return makeTree(commands.slice(1), path.pop());
    }
    else if (command.command === "set") {
      node[command.name] = command.value;
    }
    return makeTree(commands.slice(1), path);
  };

  return makeTree(commands, Immutable.Stack.of({})).first();
};