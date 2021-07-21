import Docs from "./lib/Docs";

new Docs({
    messageLimit: 40,
    compress: true,
    intents: ["guildMessages", "guildMembers", "guilds"],
    allowedMentions: {
        everyone: false,
        roles: false,
        repliedUser: true,
        users: true
    }
}).connect();