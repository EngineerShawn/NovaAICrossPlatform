let error = false;
module.exports = config => {
  console.log("=-=-=-=-=-=-=- Config file Verification -=-=-=-=-=-=-=");
  if (!config.bot.token || config.bot.token.length === 0) {
    error = true;
    console.error("🟥 Discord Developer: No discord bot token was provided");
  }
  if (!config.dash.secret || config.dash.secret.length === 0) {
    error = true;
    console.error("🟥 Discord Developer: No discord bot secret was provided");
  }
  if (!config.dash.id || config.dash.id.length === 0) {
    error = true;
    console.error("🟥 Discord Developer: No discord bot id was provided");
  }
  if (!config.dash.url || config.dash.url.length === 0) {
    error = true;
    console.error("🟥 Req/Rep/App/Website: No url for authorized");
  }
  if (authorization(config.bot.invite) === false) {
    error = true;
    console.error("🟥 NOVA AI Source System: NovaAI Invite link is missing");
  }
  if (!config.bot.prefix || config.bot.prefix.length > 5) {
    error = true;
    console.error("🟥 NOVA AI Source System: Prefix can only be a maximum of 5");
  }
  if (!config.bot.owners.length === 1) {
    error = true;
    console.error("🟥 NOVA AI Source System: There are only allowed 2 Owners MAX");
  }

  if (!error) {
    console.log("🟩 NOVA AI Source System: Config file has been verified!");
    console.log("🟩 NOVA AI Source System: Loading...");
    console.log(
      "🟩 NOVA AI Source System: Copyright 2023 © NOVA AI - Created By - Shawn Patterson - EngineerShawn"
    );
    console.log("🟩 NOVA AI Source System: Please Join My Server");
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
  }
  if (error) {
    console.log("🟥 NOVA AI Source System: Config file not verified!");
    console.log("🟥 NOVA AI Source System: Stop...");
    console.log(
      "🟥 NOVA AI Source System: Copyright 2023 © NOVA AI - Created By - Shawn Patterson - EngineerShawn"
    );
    console.log("🟥 NOVA AI Source System: Pleas Join My Server");
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    return process.exit();
  }
};
function authorization(url) {
  const botInvRegex = /^https:\/\/discord\.com\/api\/oauth2\/authorize\?client_id=\d+&permissions=\d+&redirect_uri=https%3A%2F%2Fnovaai\.engineerpatterson\.com%2Foauth2%2Fcallback&response_type=code&scope=[\w%20\.]+/;
  return botInvRegex.test(url);
}
// /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;
// /^https:\/\/discord\.com\/api\/oauth2\/authorize\?client_id=\d+&permissions=\d+&redirect_uri=https%3A%2F%2Fnovaai\.engineerpatterson\.com%2Foauth2%2Fcallback&response_type=code&scope=[\w%20\.]+/;