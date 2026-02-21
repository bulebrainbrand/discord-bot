const {SlashCommandBuilder,EmbedBuilder} = require("discord.js")

let cacheStatus = null
let cacheTime = null

const getStatus = async () => {
    if (cacheStatus && cacheTime && cacheTime && cacheTime + 1000*60*5 > Date.now()) {
        return cacheStatus
    }
    const start = performance.now()
    const response = await fetch("https://bloxd.io")
    const end = performance.now()
    cacheStatus = {code:response.status,text:response.statusText,ok:response.ok,time:end-start}
    cacheTime = Date.now()
    return cacheStatus
}

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
        await interaction.reply({embeds:[embed]})
    }
}

