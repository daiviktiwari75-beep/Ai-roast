import { Client, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";
import express from "express";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Discord bot message handler
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!roast")) return;

  const target = message.mentions.users.first();
  if (!target) {
    return message.reply("Mention someone to roast.");
  }

  const prompt = `
Roast ${target.username} in ruthless Gen Alpha English.
Savage, humiliating, merciless, meme-style.
No slurs, no racism, no threats.
Pure verbal destruction.
`;

  message.channel.sendTyping();

  const res = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const data = await res.json();
  const roast = data[0]?.generated_text || "Even the AI got tired roasting you.";

  message.channel.send(`🔥 **${target.username}**, ${roast}`);
});

// Start Express server for Render Web Service port binding
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Login Discord bot
client.login(process.env.DISCORD_TOKEN);