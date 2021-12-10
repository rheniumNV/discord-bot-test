require("dotenv").config();
const _ = require("lodash");
const Discord = require("discord.js");
const { TOKEN } = process.env;

const threadPolice = require("./apps/threadPolice");
const buttonMaker = require("./apps/buttonMaker");

const client = new Discord.Client({
  intents: Object.keys(Discord.Intents.FLAGS),
});

client.on("ready", () => {
  console.log(`${client.user.tag} でログインしています。`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "!ping") {
    msg.channel.send("Pong!");
  }
});

const main = async () => {
  await threadPolice.call(client);
  await buttonMaker.call(client);
  await client.login(TOKEN);
};

main();
