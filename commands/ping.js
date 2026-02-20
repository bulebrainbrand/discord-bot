const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data:new SlashCommandBuilder()
        .setName("ping")
        .setDescription("応答速度を測ります"),
    async execute(interaction){
        await interaction.reply("pong")
    }
}