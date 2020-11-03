const normalGacha = (gachaEmojis) => {
  const r = Math.random();
  if (r < 0.006) {
    return gachaEmojis.five;
  } else if (r < 0.006 + 0.051) {
    return gachaEmojis.four;
  } else {
    return gachaEmojis.three;
  }
};
const guaranteedGacha = (gachaEmojis, fiveStar) => {
  const r = Math.random();
  if (fiveStar) {
    return gachaEmojis.five;
  } else {
    if (r < 0.03) {
      return gachaEmojis.five;
    } else {
      return gachaEmojis.four;
    }
  }
};
const getGachaEmojis = async (logger, client) => {
  const serverId = process.env.GENSHIN_SERVER;
  const fiveId = process.env.GENSHIN_5;
  const fourId = process.env.GENSHIN_4;
  const threeId = process.env.GENSHIN_3;
  const guild = await client.guilds.fetch(serverId);
  const emojis = guild.emojis.cache;
  if (emojis) logger.debug("サーバー絵文字を取得しました。");
  return {
    five: emojis.get(fiveId).toString(),
    four: emojis.get(fourId).toString(),
    three: emojis.get(threeId).toString(),
  };
};

module.exports = {
  async gacha(logger, client, fiveStar, count = "10") {
    if (!fiveStar) return "☆4祈願はガチャ確率が不明のため未実装です。";
    logger.debug(`☆5天井祈願は${fiveStar}です。`);
    const gachaEmojis = await getGachaEmojis(logger, client);
    logger.debug(gachaEmojis);
    if (count === "10") {
      const result = [];
      for (let i = 0; i < 9; i++) result.push(normalGacha(gachaEmojis));
      result.push(guaranteedGacha(gachaEmojis, fiveStar));
      logger.debug(result);
      return `${result[0]} ${result[1]} ${result[2]} ${result[3]} ${result[4]}\n${result[5]} ${result[6]} ${result[7]} ${result[8]} ${result[9]}`;
    } else if (count === "1") {
      const result = normalGacha(gachaEmojis);
      logger.debug(result);
      return result;
    } else {
      logger.debug("原神祈願の回数に不正な値が指定されました。");
      return "回数は1回か10回を指定してください。";
    }
  },
  help(Discord) {
    return new Discord.MessageEmbed()
      .setTitle("原神祈願 提供割合")
      .addField("基礎出現確率", "☆5: 0.600%\n☆4: 5.100%\n☆3: 94.300%", true)
      .addField("☆4天井出現確率", "不明", true)
      .addField("☆5天井出現確率", "☆5: 100.000%", true)
      .addField("ピックアップ確率", "50.000%", true);
  },
};
