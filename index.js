require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT

app.get("/",(req,res) => {
    res.status(200).send('okokokok')
})

app.listen(port,() => {
    console.log("listening")
})

const { Client,GatewayIntentBits,REST,Routes, EmbedBuilder} = require("discord.js")

const rest = new REST({version:"10"}).setToken(process.env.TOKEN)

const commands = [
    {
        name:"ping",
        description:"遅延を確認します"
    }
];

(async () => {
    try {
        console.log("start set /commands")
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),{body:commands})
        console.log("success set /commands")
    } catch (e) {
        console.error(e)
    }
})();

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once("clientReady",()=>{
    console.log("hello discord")
})

client.on("interactionCreate",async (interaction) => {
    if(interaction.isChatInputCommand()){
      if(interaction.commandName === "ping"){
        const embed = new EmbedBuilder()
          .setTitle("🏓PONG!")
          .setDescription("🟢success")
          .setColor("DarkGreen")
          .addFields(
            {name:"遅延",value:`${client.ws.ping}`,inline:true},
          )
          .setTimestamp()
        await interaction.reply({embeds:[embed]})
      }
    }
})

client.login(process.env.TOKEN)
