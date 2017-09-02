import winston from 'winston'
import chalk from 'chalk'

import * as Emoji from './emoji'

const intro = chalk.bold.white(`[native-directory]`)
const happy = message => chalk.blue(`${intro}: ${Emoji.robot} ${message}`)
const upset = message => chalk.red(`${intro}: ${Emoji.siren} ${message}`)

export const info = (...messages) =>
  messages.forEach(message => winston.info(happy(message)))

export const error = (...messages) =>
  messages.forEach(message => winston.error(upset(message)))
