import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => res.send("Alive"));
app.listen(PORT, () => console.log("Web server started"));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("!roast")) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Tag someone.");
    message.channel.send(`${user.username} has NPC energy.`);
  }
});

// 🔴 THIS IS THE IMPORTANT PART
client.login(process.env.DISCORD_TOKEN)
  .then(() => console.log("Login successful"))
  .catch(err => console.error("LOGIN FAILED:", err));