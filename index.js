import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("Bot is running");
});
app.listen(3000, () => {
  console.log("Web server started");
});

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

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!roast")) {
    const user = message.mentions.users.first();
    if (!user) {
      message.reply("Tag someone to roast.");
      return;
    }

    message.channel.send(
      `${user}, you run on 1% confidence and 99% WiFi lag.`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);