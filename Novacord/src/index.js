const NOVA_BOT = require("./structures/Client");
const Discord = require("discord.js");
const client = new NOVA_BOT();
client.start();
require("./structures/antiCrash")(client);
require("./handlers/handler")(client);
