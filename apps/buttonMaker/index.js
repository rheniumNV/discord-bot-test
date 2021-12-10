const _ = require("lodash");
const Discord = require("discord.js");

exports.call = async (client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (msg.content === "!dm") {
      const dm = msg.author.send("hello");
    }

    if (_.startsWith(msg.content, "!makeButton")) {
      try {
        const command = _.split(msg.content, " ");
        const method = command[1];
        const arg1 = command[2];
        switch (method) {
          case "cvcn":
            const tic1 = new Discord.MessageButton()
              .setCustomId(method + " " + arg1)
              .setStyle("PRIMARY")
              .setLabel("ボイスチャンネル名変更: " + arg1);
            await msg.channel.send({
              content: msg.content,
              components: [new Discord.MessageActionRow().addComponents(tic1)],
            });
            msg.delete();
            break;
          default:
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
  client.on("interactionCreate", async (interaction) => {
    if (_.startsWith(interaction.customId, "cvcn")) {
      try {
        const command = _.split(interaction.customId, " ");
        const arg1 = command[1];

        await interaction.member.voice.channel.setName(arg1);

        await interaction.reply({
          content: "ボイスチャンネル名を変更しました。",
          ephemeral: true,
        });
      } catch (e) {
        console.error(e);
        await interaction.reply({
          content: "ボイスチャンネル名の変更に失敗しました。",
          ephemeral: true,
        });
      }
    }
  });
};
