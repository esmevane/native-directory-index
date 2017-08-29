import Logger, { Loggable } from "../logger"
import Service, { Serveable } from "../service"
import Pid from "./pid"
import Serve from "./serve"
import Start from "./start"
import Stop from "./stop"

export interface CliActions {
  pid: CliCommand
  start: CliCommand
  stop: CliCommand
  serve: CliCommand
}

export interface CliAction {
  perform(): Promise<void>
  toCommand(): CliCommand
}

export interface CliCommand {
  command: string
  desc: string
  builder: Function
  handler: Function
}

export interface CliOptions {
  service: Serveable
  logger: Loggable
}

export const defaults: CliOptions = {
  service: new Service(),
  logger: new Logger()
}

export default class Cli {
  public actions: CliActions
  public service: Serveable
  public logger: Loggable

  constructor(givenOptions: Partial<CliOptions> = {}) {
    const options = { ...defaults, ...givenOptions }
    const { logger, service } = options

    this.logger = logger
    this.service = service

    this.actions = {
      pid: new Pid({ logger, service }).toCommand(),
      serve: new Serve({ logger, service }).toCommand(),
      start: new Start({ logger, service }).toCommand(),
      stop: new Stop({ logger, service }).toCommand()
    }
  }
}