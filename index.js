import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();

// IMPORTANT: use Render's PORT
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, () => {
  console.log("Web server started on port", PORT);
});

// DEBUG TOKEN (THIS IS SAFE — does NOT print token)
console.log(
  "DISCORD_TOKEN length:",
  process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN.length : "MISSING"
);

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

client.login(process.env.DISCORD_TOKEN);