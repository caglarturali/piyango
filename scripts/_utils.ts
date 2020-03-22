import chalk from 'chalk';

export enum MessageType {
  NORMAL,
  SUCCESS,
  WARNING,
  ERROR,
}

/**
 * Prints beautified text.
 * @param text Raw text
 * @param msgType Message type
 */
export const printMsg = (
  text: string,
  msgType: MessageType = MessageType.NORMAL,
) => {
  // tslint:disable: no-console
  let msg: string;
  switch (msgType) {
    case MessageType.NORMAL:
      msg = chalk.blue(text);
      break;

    case MessageType.SUCCESS:
      msg = chalk.green(text);
      break;

    case MessageType.WARNING:
      msg = chalk.yellow(text);
      break;

    case MessageType.ERROR:
      msg = chalk.red(text);
      break;
  }
  console.log(`--> ${msg}`);
  // tslint:enable: no-console
};
