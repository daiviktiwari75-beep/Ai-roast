require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 10000;

/* ---------- WEB SERVER (FOR RENDER) ---------- */
app.get("/", (req, res) => {
  res.send("Discord bot is running.");
});

app.listen(PORT, () => {
  console.log(`Web server started on port ${PORT}`);
});

/* ---------- DISCORD BOT ---------- */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const roasts = [
  "Bro has WiFi but still no connection to reality.",
  "You don't need enemies, your decisions are enough.",
  "Even autocorrect gave up on you.",
  "NPC behavior detected.",
  "You got the confidence of a legend with the skills of a tutorial bot."
];

client.on("messageCreate", message => {
  if (message.author.bot) return;

  if (message.content.startsWith("!roast")) {
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply("Tag someone to roast.");
    }

    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    message.channel.send(`${target}, ${roast}`);
  }
});

client.login(process.env.DISCORD_TOKEN);