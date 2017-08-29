import { Startable } from "./server"
import { Serveable } from "./service"
import { Loggable } from "./logger"

const contains = (list: any[], item: any) => list.indexOf(item) > -1

export class SpyServer implements Startable {
  constructor(public started: Boolean = false) {}
  async start(): Promise<void> { this.started = true }
}

export class SpyLogger implements Loggable {
  public infoOutput: string[] = []
  public errorOutput: string[] = []

  printedError(message: string): boolean { return contains(this.errorOutput, message) }
  printedInfo(message: string): boolean { return contains(this.infoOutput, message) }

  info(message: string): void { this.infoOutput.push(message) }
  error(message: string): void { this.errorOutput.push(message) }
}

export class SpyService implements Serveable {
  public triggers: string[] = []

  wasCalled(method: string): boolean { return contains(this.triggers, method) }

  async start(): Promise<void> { this.triggers.push("start") }
  async stop(): Promise<void> { this.triggers.push("stop") }

  async pid(): Promise<number | undefined> {
    this.triggers.push("pid")
    return undefined
  }

  async serve(): Promise<Startable> {
    this.triggers.push("serve")
    return { start: async () => {} }
  }
}

