require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "info";
const prefix = process.env.PREFIX;

const gacha = async (fes) => {
  const serverId = process.env.SERVER;
  const ssrId = process.env.SSR;
  const srId = process.env.SR;
  const cId = process.env.C;
  const guild = await client.guilds.fetch(serverId);
  const emojis = guild.emojis.cache;
  logger.debug(emojis);
  const ssr = emojis.get(ssrId);
  const sr = emojis.get(srId);
  const c = emojis.get(cId);
  logger.debug(`${ssr} ${sr} ${c}`);
  if (fes) {
    const normalGacha = () => {
      const r = Math.random();
      if (r < 0.06) {
        return ssr;
      } else if (r < 0.18) {
        return sr;
      } else {
        return c;
      }
    };
    const guaranteedGacha = () => {
      const r = Math.random();
      if (r < 0.06) {
        return ssr;
      } else {
        return sr;
      }
    };
    return `${normalGacha()} ${normalGacha()} ${normalGacha()} ${normalGacha()} ${normalGacha()}\n${normalGacha()} ${normalGacha()} ${normalGacha()} ${normalGacha()} ${guaranteedGacha()}`;
  } else {
    const normalGacha = () => {
      const r = Math.random();
      if (r < 0.03) {
        return ssr;
      } else if (r < 0.15) {
        return sr;
      } else {
        return c;
      }
    };
    const guaranteedGacha = () => {
      const r = Math.random();
      if (r < 0.03) {
        return ssr;
      } else {
        return sr;
      }
    };
    return `${normalGacha()} ${normalGacha()} ${normalGacha()} ${normalGacha()} ${normalGacha()}\n${normalGacha()} ${normalGacha()} ${normalGacha()} ${normalGacha()} ${guaranteedGacha()}`;
  }
};

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
      const embed = new Discord.MessageEmbed()
        .setTitle("プラチナトマトガシャ 提供割合")
        .addField("トマトガシャ", "SSレア: 3.000%\nSレア: 12.000%\nレア: 85.000%", true)
        .addField("トマトSレア以上確定ガシャ", "SSレア: 3.000%\nSレア: 97.000%", true)
        .addField("トマトフェスガシャ", "SSレア: 6.000%\nSレア: 12.000%\nレア: 82.000%", true)
        .addField("トマトフェスSレア以上確定ガシャ", "SSレア: 6.000%\nSレア: 94.000%", true);
      message.channel.send(embed);
      logger.info("ヘルプされました。");
    } else if (args[0] === "fes") {
      const msg = await gacha(true);
      await message.channel.send(msg);
      logger.info("トマトフェスガシャが引かれました。");
    } else {
      const msg = await gacha(false);
      message.channel.send(msg);
      logger.info("トマトガシャが引かれました。");
    }
  }
});

client.login();
