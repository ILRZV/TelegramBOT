import { Context as TelegrafContext } from "telegraf";

export class Context extends TelegrafContext {
  session: any;
  scene: any;
  get message(): any {
    return super.message;
  }
}
