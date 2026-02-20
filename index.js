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

const { Client,GatewayIntentBits,REST,Routes} = require("discord.js")

const rest = new REST({version:"10"}).setToken(process.env.TOKEN)

const commands = [
    {
        name:"ping",
        description:"動くか確認"
    }
]

(async () => {
    try {
        console.log("start set /commands")
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID),{body:commands})
        console.log("success set /commands")
    } catch (e) {
        console.error(e)
    }
})()

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once("ready",()=>{
    console.log("hello discord")
})

client.on("interactionCreate",async (interaction) => {
    if(interaction.isChatInputCommand()){
      if(interaction.commandName === "!ping"){
          await interaction.reply("pong!")
      }
    }
})

client.login(process.env.TOKEN)
