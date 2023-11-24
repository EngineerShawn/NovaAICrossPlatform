const path = require('path');
require('dotenv').config({path: '../../.env'});
// console.log(process.env.DATABASE_URL);
module.exports = {
  bot: {
    token: process.env.NOVA_BOT_TOKEN, //Bot Token from https://discord.com/developers/applications
    prefix: "/", //Bot Prefix
    owners: ["915420974873210890"], //Bot Owner ID
    maintenance: false,
    postgresUrl: process.env.DATABASE_URL, 
    invite:
      "https://discord.com/api/oauth2/authorize?client_id=1172432649307037787&permissions=8&redirect_uri=https%3A%2F%2Fnovaai.engineerpatterson.com%2Foauth2%2Fcallback&response_type=code&scope=identify%20email%20connections%20guilds%20guilds.join%20guilds.members.read%20bot%20webhook.incoming%20messages.read%20applications.builds.read%20applications.commands%20applications.store.update%20applications.entitlements", //Link Invite Bot
    bot_add_description:
      "You've just added me to **{guild}**.\nThank you for adding me to your server",
    bot_remove_description:
      "You removed me from **{guild}** server, invite me again if you need me!"
  },
  status: {
    stats: "Online", //Status Bot <idle, online, dnd , invisible>
    type: "Watching", //Playing Bot <PLAYING, WATCHING , and others>
    name: "Playing" //Status Playing
  },
  dash: {
    secret: process.env.CLIENT_SECRET, //SECRET Bot
    id: "1172432649307037787", //ID Bot
    url: 'https://novaai.engineerpatterson.com' //URL
  },
  server: {
    id: "1172442013543698483", //Server ID
    invite: "https://discord.gg/8WmU4YbMPM" //Server Support
  },
  image: {
    welcome:
      "https://cdn.glitch.com/02e867ae-7c7c-4637-ace7-66ea251fe9d5%2Fwelcome.png?v=1613195262594", //Image WelcomeCard
    leave:
      "https://cdn.glitch.com/02e867ae-7c7c-4637-ace7-66ea251fe9d5%2Fwelcome.png?v=1613195262594", //Image LeaveCard
    level:
      "https://cdn.glitch.com/2337366e-e123-49db-827b-3e28e03e7910%2Fimages.jpeg?1623811398590", //Image LevelCard
    help:
      "https://media.discordapp.net/attachments/806082492498706442/900573349577633802/standard_1.gif", //Image Cmd Help.js
    guild_add:
      "https://cdn.discordapp.com/attachments/829696536396955649/856381256379400202/20210621_105311.jpg", //Image Guild Add
    guild_remove: "",
    leaderboard:
      "https://i.pinimg.com/736x/d1/00/7b/d1007b46e6175f49f53712f16e4f6a3c.jpg" //Image Leaderboard Card
  },
  mod: {
    muted_default: "Muted", // bot will make Roles muted for members who got muted
    limit_warn: 3, //bot will kick member if it has 3 warns
    limit_muted: 5 //bot will kick member if it has 5 Muted
  },
  logs: {
    boton: "1175424494945448046", //Channel ID Bot Online
    botadd: "1175424614541840414", //Channel ID Bot Add In Guild
    botdel: "1175424614541840414", //Channel ID Bot Remove in Guild
    botreport: "1176994591052927046", // Channel ID Bot Reports
    boterror: "1175424494945448046" // Error Channel
  },
  giveaway: {
    default: {
      storage: "./data/giveaways.json",
      default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        embedColorEnd: "#FF0000",
        reaction: "882659092559196190"
      }
    }
  }
};
console.log(module.exports.bot);
