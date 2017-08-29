import * as winston from 'winston'
import * as chalk from 'chalk'

export interface Loggable {
  info(...messages: any[]): void
  error(...messages: any[]): void
}

export default class Logger implements Loggable {
  info(message: string): void {
    winston.info(chalk.blue(message))
  }

  error(message: string): void {
    winston.error(chalk.red(message))
  }
}
