import Eris from "eris";
import Manager from "../Manager";
import { context, ICommand } from "../types/Interfaces";

export = class Docs implements ICommand {
    public name = "docs";
    public description = "Searches the bcfd docs for the keyword or anything";

    public execute({ manager, message, args, client }: context) {
        let embeds: Eris.EmbedOptions[] = [];

        switch (args[0]) {
            case "keywords":
                this.executeKey(manager, args, message, embeds, client);
                break;
            case "keys":
                this.executeKey(manager, args, message, embeds, client);
            case "commandtypes":
                break;
        default:
            break;
        }
    }

    executeKey(
        manager: Manager, 
        args: string[], 
        message: Eris.Message, 
        embeds: Eris.EmbedOptions[], 
        client: Eris.Client
    ) {
        if (!args.length) {
            return message.channel.createMessage("You can search up to 5 keys, search something");
        }

        if (args.length > 5) {
            return message.channel.createMessage("You can only search up to 5 keys at a time!");
        }


        let keywords = manager.searchKeys(args.slice(1));

        // @ts-ignore
        for (let key of keywords) {
            let desc: string[] = [];

            if (key.format) {
                desc.push(`Format: \`${key.format}\``);
            }

            if (key.params) {
                desc.push(`Params: \`${key.params}\``);
            }

            if (key.returns) {
                desc.push(`Returns: \`${key.returns}\``);
            }

            if (key.value) {
                desc.push(`Value: \`${key.value}\``);
            }

            embeds.push({ 
                title: `Keyword ${key.name}`, 
                description: desc.join("\n"),
                fields: [
                    {
                        name: "Description",
                        value: key.description || "No description provided"
                    }
                ]
            })
        }

        return client.createMessage(message.channel.id, {
            // @ts-ignore
            embeds
        })
    }


}