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


const { Client,GatewayIntentBits,Events} = require("discord.js")

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once("ready",()=>{
    console.log("heiio discord")
})

client.on("messageCreate",(message) => {
    if(message.author.bot)return;
    if(message.content === "!ping"){
        message.channel.send("pong!")
    }
})

client.login(process.env.TOKEN)
