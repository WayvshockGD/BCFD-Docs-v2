import Eris from "eris";
import Docs from "../Docs";
import Manager from "../Manager";

export interface ICommand {
    name: string;
    description: string;
    aliases?: string[];
    [key: string]: any;
}

export interface context {
    guild: Eris.Guild;
    message: Eris.Message;
    client: Docs;
    args: string[];
    manager: Manager;
}