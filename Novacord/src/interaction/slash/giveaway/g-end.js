/**
 *  Note: the Integer types needed below are one of the below:
 * - 1: SUB_COMMAND             - 7: CHANNEL
 * - 2: SUB_COMMAND_GROUP       - 8: ROLE
 * - 3: STRING                  - 9: MENTIONABLE
 * - 4: INTEGER                 - 10: NUMBER
 * - 5: BOOLEAN                 - 11: MENTION_USER
 * - 6: USER                         
 */


const ms = require("ms");

module.exports = {
  name: "end-giveaway",
  description: "End a giveaway!",
  options: [
    {
      name: "giveaway",
      description: "The giveaway to end (message ID or giveaway prize)",
      type: 3,
      required: true
    }
  ],
  P_user: ["MANAGE_MESSAGES"],
  async execute(client, interaction){
    const query = interaction.options.getString("giveaway");
    const giveaway =
      client.giveawaysManager.giveaways.find(
        g => g.prize === query && g.guildId === interaction.guild.id
      ) ||
      client.giveawaysManager.giveaways.find(
        g => g.messageId === query && g.guildId === interaction.guild.id
      );
    if (!giveaway) {
      return interaction.reply({
        content: "Unable to find a giveaway for `" + query + "`.",
        ephemeral: true
      });
    }
    if (giveaway.ended) {
      return interaction.reply({
        content: "This giveaway is already ended.",
        ephemeral: true
      });
    }
    client.giveawaysManager
      .end(giveaway.messageId)
      .then(() => {
        interaction.reply({ content: "Giveaway ended!", ephemeral: true });
      })
      .catch(e => {
        interaction.reply({
          content: e,
          ephemeral: true
        });
      });
  }
};
