const _ = require("lodash");

exports.call = async (client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (_.startsWith(msg.content, "!addMsg") && msg.channel.isThread()) {
      try {
        const command = _.split(msg.content, " ");
        const targetMsgId = command[1];
        const targetMsg = await msg.channel.parent.messages.fetch(targetMsgId);

        await msg.channel.send({
          content: `${targetMsg.author}`,
          embeds: [
            {
              author: {
                name: targetMsg.member.displayName,
                icon_url: targetMsg.member.displayAvatarURL(),
                url: targetMsg.url,
              },
              description: targetMsg.content,
              color: targetMsg.author.hexAccentColor,
              timestamp: targetMsg.createdAt,
            },
          ],
        });
        await msg.channel.send({
          embeds: targetMsg.embeds,
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (msg.type === "REPLY" && _.includes(msg.channel.topic, "スレッド警察")) {
      try {
        const targetMsg = await msg.channel.messages.fetch(
          msg.reference.messageId
        );

        if (!targetMsg.hasThread) {
          const threadNameValid =
            !!targetMsg.content && targetMsg.content != "";
          await targetMsg.startThread({
            name: threadNameValid ? targetMsg.content : "thread",
          });
        }

        if (targetMsg.hasThread) {
          await targetMsg.thread.send({
            content: `${msg.author}`,
            embeds: [
              {
                author: {
                  name: msg.member.displayName,
                  icon_url: msg.member.displayAvatarURL(),
                  url: msg.url,
                },
                description: msg.content,
                color: msg.author.hexAccentColor,
                timestamp: msg.createdAt,
              },
            ],
          });
          await targetMsg.thread.send({
            embeds: msg.embeds,
          });
        }

        //msg.delete();
      } catch (e) {
        console.error(e);
      }
    }
  });
};
