import Eris from "eris";
import config from "../production.json";
import { Logger } from "tslog";
import { ICommand } from "./types/Interfaces";
import { readdirSync } from "fs";
import Manager from "./Manager";

export = class Docs extends Eris.Client {
    logger: Logger;
    commands: Map<string, ICommand>;
    constructor(opts: Eris.ClientOptions) {
        super(config.token, opts);

        this.logger = new Logger();
        this.commands = new Map();
        this.loadCommands();

        this.on("ready", this.onStartup.bind(this));
        this.on("messageCreate", this.onMessage.bind(this));
    }

    public async connect() {
        super.connect()
             .catch(err => {
                 this.logger.error(err);
             });
    }

    private onMessage(message: Eris.Message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;

        let args = message.content.slice(config.prefix.length).trim().split(" ");

        let command = this.commands.get(args[0]);
        args = args.slice(1);
        if (!command) return;

        command.execute({
            message,
            args,
            client: this,
            guild: (<Eris.GuildChannel>message.channel).guild,
            manager: new Manager()
        })
    }

    private loadCommands() {
        let folder = readdirSync(config.ts_node ? "./lib/commands/" : "./build/lib/commands");
        for (let file of folder) {
            let Class = require(`./commands/${file}`);
            let command: ICommand = typeof Class === "object" 
                                    ? Class : new Class();
            this.commands.set(command.name, command);
            this.logger.info("Loaded command", command.name);
        }
    }

    private onStartup() {
        this.editStatus("idle", {
            name: `${config.prefix}help | ${this.guilds.size} ${this.guilds.size > 0 ? "guild" : "guilds"}`,
            type: 0
        });
        this.logger.info(`Client ( ${this.user.username} ) started on date ( ${new Date().toISOString()} )`);
    }
}