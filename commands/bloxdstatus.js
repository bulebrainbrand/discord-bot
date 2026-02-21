const {SlashCommandBuilder,EmbedBuilder} = require("discord.js")

const {getStatus} = require("getbloxdstatus")

module.exports = {
    data:new SlashCommandBuilder()
        .setName("bloxdstatus")
        .setDescription("bloxdの状況を確認できます"),
    async execute(interaction,client){
        await interaction.deferReply()
        
        const {code,text,ok,time} = await getStatus()
        const embed = new EmbedBuilder()
          .setTitle("Bloxd.io")
          .setDescription(ok?"成功":"失敗")
          .addFields(
            {name:"HTTPステータスコード",value:String(code)},
            {name:"メッセージ",value:text},
            {name:"応答速度",value:`${time}ms`,inline:true},
            {name:"取得時間",value:new Date(cacheTime).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"})})
          .setColor(ok?"DarkGreen":"DarkRed") 
          .setTimestamp()
        await interaction.editReply({embeds:[embed]})
    }
}

