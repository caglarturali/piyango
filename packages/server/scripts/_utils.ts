import { execSync } from 'child_process';
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
 * @param inset Prepend message with a tab
 */
export const printMsg = (
  text: string,
  msgType: MessageType = MessageType.NORMAL,
  inset: boolean = false,
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
  console.log(`${inset ? '\t' : ''}--> ${msg}`);
  // tslint:enable: no-console
};

/**
 * Executes commands and commits changes with the message provided.
 * @param commands Commands to be executed
 * @param msg Commit message.
 */
export const execCommandsAndCommit = (commands: string[], msg: string) => {
  const cmds = commands.slice();
  cmds.push(`git commit -m "${msg}"`);
  execSync(cmds.join(' && '), {
    stdio: [0, 1, 2],
  });
};
