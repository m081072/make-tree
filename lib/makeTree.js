exports = module.exports = {};

exports.make = function (commands) {
    var makeTree = function (commands, node) {
        if (commands.length === 0) {
            return [];
        }
        var command = commands[0];
        console.log(command);
        if (command.command === "begin") {
            var newNode = {};
            var remainingCommands = makeTree(commands.slice(1), newNode);
            node[command.value] = newNode;
            return makeTree(remainingCommands, node);
        }
        if (command.command === "set") {
            node[command.name] = command.value;
            return makeTree(commands.slice(1), node);
        }
        return commands.slice(1);
    };

    var result = {};
    makeTree(commands, result);
    return result;
};