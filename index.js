require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";
const prefix = process.env.PREFIX;
const tomato = require("./modules/tomato");

client.on("ready", () => {
  client.user.setActivity("プラチナトマトガシャ");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply("pong");
    logger.info(`Pinged from ${message.channel.name} in ${message.guild}.`);
  }

  if (!message.guild) return;

  if (command === "tomato") {
    if (args[0] === "help") {
      const embed = tomato.help(Discord);
      message.channel.send(embed);
      logger.info("ヘルプされました。");
    } else if (args[0] === "fes") {
      const msg = await tomato.gacha(logger, client, true);
      message.channel.send(msg);
      logger.info("トマトフェスガシャが引かれました。");
    } else {
      const msg = await tomato.gacha(logger, client, false);
      message.channel.send(msg);
      logger.info("トマトガシャが引かれました。");
    }
  }
});

client.login();
