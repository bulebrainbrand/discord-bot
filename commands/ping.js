const {SlashCommandBuilder,EmbedBuilder} = require("discord.js")

module.exports = {
    data:new SlashCommandBuilder()
        .setName("ping")
        .setDescription("応答速度を測ります"),
    async execute(interaction,client){
        const messages = ["今日も労働中","明日はシャットダウンしよっかな","pingって潜水艦のソナーが元ネタなんだって！"]
        const embed = new EmbedBuilder()
          .setTitle("PONG!")
          .setDescription(messages[Math.floor(Math.random() * messages.length)])
          .addFields({name:"応答速度",value:`${client.ws.ping}ms`})
          .setColor("DarkGreen") 
          .setTimestamp()
        await interaction.reply({embeds:[embed]})
    }
}