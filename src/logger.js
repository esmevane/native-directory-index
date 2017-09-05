import winston from 'winston'
import chalk from 'chalk'

import * as Emoji from './emoji'

const { Logger, transports: { Console } } = winston

const formatter = ({ message }) => `${message || ''}`
const transports = [new Console({ formatter })]
const logger = new Logger({ transports })

const intro = chalk.bold.white(`[native-directory]`)
const happy = message =>
  chalk.blue(`${intro}: ${Emoji.robot} ${message}`)
const upset = message =>
  chalk.red(`${intro}: ${Emoji.siren} ${message}`)

export const info = (...messages) =>
  messages.forEach(message => logger.info(happy(message)))

export const error = (...messages) =>
  messages.forEach(message => logger.error(upset(message)))
