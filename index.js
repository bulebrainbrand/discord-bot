require("dotenv").config()
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
