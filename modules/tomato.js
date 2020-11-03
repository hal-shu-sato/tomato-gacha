const normalGacha = (gachaEmojis, fes) => {
  const r = Math.random();
  if (fes) {
    if (r < 0.06) {
      return gachaEmojis.ssr;
    } else if (r < 0.06 + 0.12) {
      return gachaEmojis.sr;
    } else {
      return gachaEmojis.c;
    }
  } else {
    if (r < 0.03) {
      return gachaEmojis.ssr;
    } else if (r < 0.03 + 0.12) {
      return gachaEmojis.sr;
    } else {
      return gachaEmojis.c;
    }
  }
};
const guaranteedGacha = (gachaEmojis, fes) => {
  const r = Math.random();
  if (fes) {
    if (r < 0.06) {
      return gachaEmojis.ssr;
    } else {
      return gachaEmojis.sr;
    }
  } else {
    if (r < 0.03) {
      return gachaEmojis.ssr;
    } else {
      return gachaEmojis.sr;
    }
  }
};
const getGachaEmojis = async (logger, client) => {
  const serverId = process.env.TOMATO_SERVER;
  const ssrId = process.env.TOMATO_SSR;
  const srId = process.env.TOMATO_SR;
  const cId = process.env.TOMATO_C;
  const guild = await client.guilds.fetch(serverId);
  const emojis = guild.emojis.cache;
  if (emojis) logger.debug("サーバー絵文字を取得しました。");
  return {
    ssr: emojis.get(ssrId).toString(),
    sr: emojis.get(srId).toString(),
    c: emojis.get(cId).toString(),
  };
};

module.exports = {
  async gacha(logger, client, fes, count = "10") {
    logger.debug(`フェスガシャは${fes}です。`);
    const gachaEmojis = await getGachaEmojis(logger, client);
    logger.debug(gachaEmojis);
    if (count === "10") {
      const result = [];
      for (let i = 0; i < 9; i++) result.push(normalGacha(gachaEmojis, fes));
      result.push(guaranteedGacha(gachaEmojis, fes));
      logger.debug(result);
      return `${result[0]} ${result[1]} ${result[2]} ${result[3]} ${result[4]}\n${result[5]} ${result[6]} ${result[7]} ${result[8]} ${result[9]}`;
    } else if (count === "1") {
      const result = normalGacha(gachaEmojis, fes);
      logger.debug(result);
      return result;
    } else {
      logger.debug("トマトガシャの回数に不正な値が指定されました。");
      return "回数は1回か10回を指定してください。";
    }
  },
  help(Discord) {
    return new Discord.MessageEmbed()
      .setTitle("プラチナトマトガシャ 提供割合")
      .addField("トマトガシャ", "SSレア: 3.000%\nSレア: 12.000%\nレア: 85.000%", true)
      .addField("トマトSレア以上確定ガシャ", "SSレア: 3.000%\nSレア: 97.000%", true)
      .addField("トマトフェスガシャ", "SSレア: 6.000%\nSレア: 12.000%\nレア: 82.000%", true)
      .addField("トマトフェスSレア以上確定ガシャ", "SSレア: 6.000%\nSレア: 94.000%", true);
  },
};
