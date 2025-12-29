import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

/* ---------- EXPRESS (FOR RENDER) ---------- */
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, () => {
  console.log("Web server started on port", PORT);
});

/* ---------- DISCORD CLIENT ---------- */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

/* ---------- READY EVENT ---------- */
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

/* ---------- MESSAGE HANDLER ---------- */
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!roast")) {
    const user = message.mentions.users.first();

    if (!user) {
      message.reply("Tag someone to roast.");
      return;
    }

    message.channel.send(
      `${user}, even your WiFi has given up on you.`
    );
  }
});

/* ---------- LOGIN (WITH ERROR LOGGING) ---------- */
client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log("Login promise resolved"))
  .catch((err) => console.error("LOGIN ERROR:", err));