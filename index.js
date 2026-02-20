require("dotenv").config()

const express = require("express")
const fs = require("node:fs")
const path = require("node:path")
const app = express()
const port = process.env.PORT

app.get("/",(req,res) => {
    res.status(200).send('okokokok')
})

app.listen(port,() => {
    console.log("listening")
})

const { Client,Collection,GatewayIntentBits,REST,Routes, EmbedBuilder, MessageFlags} = require("discord.js")

const rest = new REST({version:"10"}).setToken(process.env.TOKEN)

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.commands = new Collection()

const commandsPath = path.join(__dirname,"commands")
const commandFiles = fs.readdirSync(commandsPath).filter(fileName => fileName.endsWith(".js"))

const commandsJSON = []

for (const fileName of commandFiles) {
    const filePath = path.join(commandsPath,fileName)
    const command = require(filePath)
    if (Object.hasOwn(command,"data") && Object.hasOwn(command,"execute")) {
        client.commands.set(command.data.name,command)
        commandsJSON.push(JSON.stringify(command.data))
    }
}



client.once("clientReady",async ()=>{
    try {
        await rest.put(Routes.applicationCommands(client.user.id),{body:commandsJSON})
        console.log("success set command")
    } catch (e) {
        console.error("set command error",e)
    }
    console.log("hello discord")
})

client.on("interactionCreate",async (interaction) => {
    if(interaction.isChatInputCommand()){
      const command = client.commands.get(interaction.commandName)
      if(!command)return;
      try {
        await command.execute(interaction)
      } catch (e) {
        console.error(`${interaction.commandName} runtime.`,e)
        await interaction.reply({content:"エラーが発生しました",flags:[MessageFlags.Ephemeral]})
      }
    }
})

client.login(process.env.TOKEN)
