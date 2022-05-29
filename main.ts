import express from "express";
import { Client, Intents, TextChannel } from "discord.js";
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.login(process.env.TOKEN_BOT)

const port = 3000

app.post("/notifications", async (request, response) => {

    const channel = client.channels.cache.get('980083024672718939');


    if (request.body.action == "created") {
        // @ts-ignore
        let html_url = request.body.release.html_url
        let release_name = request.body.release.name
        let body = request.body.release.body

        const payload = {
            release_name,
            html_url,
            body
        }

        // @ts-ignore
        channel.send(JSON.stringify(payload));
    }

    response.json({ok: true})
})

app.listen(port, () => {
    console.log("listening on port")
})