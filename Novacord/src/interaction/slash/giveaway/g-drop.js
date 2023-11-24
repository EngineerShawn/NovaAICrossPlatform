/**
 *  Note: the Integer types needed below are one of the below:
 * - 1: SUB_COMMAND             - 7: CHANNEL
 * - 2: SUB_COMMAND_GROUP       - 8: ROLE
 * - 3: STRING                  - 9: MENTIONABLE
 * - 4: INTEGER                 - 10: NUMBER
 * - 5: BOOLEAN                 - 11: MENTION_USER
 * - 6: USER                         
 */
module.exports = {
  name: "drop-giveaway",
  description: "Create a drop giveaway!",
  options: [
    {
      name: "winners",
      description: "How many winners the giveaway should have",
      type: 4,
      required: true
    },
    {
      name: "prize",
      description: "What the prize of the giveaway should be",
      type: 3,
      required: true
    },
    {
      name: "channel",
      description: "The channel to start the giveaway in",
      type: 7,
      required: true
    }
  ],
  P_user: ["MANAGE_MESSAGES"],
  execute: async (client, interaction) => {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");
    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ":x: Selected channel is not text-based.",
        ephemeral: true
      });
    }
    client.giveawaysManager.start(giveawayChannel, {
      winnerCount: giveawayWinnerCount,
      prize: giveawayPrize,
      hostedBy: interaction.user || null,
      thumbnail: "https://ezzud.fr/images/closedFixed.png",
      isDrop: true,
      messages: await client.ops.giveaway(client)
    });
    interaction.reply(`Giveaway started in ${giveawayChannel}!`);
  }
};
