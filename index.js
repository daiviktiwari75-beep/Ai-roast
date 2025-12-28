import { Client, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!roast")) return;

  const target = message.mentions.users.first();
  if (!target) {
    return message.reply("Mention someone to roast.");
  }

const prompt = `
Roast ${target.username} in ruthless Gen Alpha style English.
Make it savage, humiliating, and brutally funny.
Use modern slang, meme energy, and internet insults.
No slurs, no racism, no religion, no threats.
Pure verbal destruction. One short paragraph.
`;

  message.channel.sendTyping();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const data = await response.json();
  const roast = data[0]?.generated_text || "I ran out of insults.";

  message.channel.send(`🔥 **${target.username}**, ${roast}`);
});

client.login(process.env.DISCORD_TOKEN
