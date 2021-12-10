const _ = require("lodash");

exports.call = async (client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.type === "REPLY" && _.includes(msg.channel.topic, "スレッド警察")) {
      try {
        const targetMsg = await msg.channel.messages.fetch(
          msg.reference.messageId
        );

        if (!targetMsg.hasThread) {
          const threadNameValid = !targetMsg.content && targetMsg.content != "";
          await targetMsg.startThread({
            name: threadNameValid ? targetMsg.content : "thread",
          });
        }

        if (targetMsg.hasThread) {
          await targetMsg.thread.send({
            embeds: [
              {
                author: {
                  name: msg.member.displayName,
                  icon_url: msg.member.displayAvatarURL(),
                },
                description: msg.content,
                color: 4303284,
              },
            ],
          });
        }

        msg.delete();
      } catch (e) {
        console.error(e);
      }
    }
  });
};
