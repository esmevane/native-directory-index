import { spawn } from 'child_process'
import { resolve } from 'path'

import { read, write, unlink } from './filePromises'
import Config from '../config'
import Server, { Startable } from '../server'

const config = new Config()
const server = new Server({ config })
const { kill } = process

export interface Serveable {
  pid(): Promise<number | undefined>
  serve(): Promise<Startable>
  start(): Promise<void>
  stop(): Promise<void>
}

export interface ServiceOptions {
  config: Config
  server: Startable
  spawn: Function
  kill: Function
}

export const defaults: ServiceOptions = { config, server, spawn, kill }

export default class Service implements Serveable {
  private SERVE_METHOD: string = 'serve'
  private config: Config
  private server: Startable
  private spawn: Function
  private kill: Function

  constructor(givenOptions: Partial<ServiceOptions> = {}) {
    const options = { ...defaults, ...givenOptions }

    this.config = options.config
    this.kill = options.kill
    this.server = options.server
    this.spawn = options.spawn
  }

  get pidfile(): string {
    return resolve(
      '/tmp',
      `native-directory-index-${this.config.environment}.pid`
    )
  }

  async pid(): Promise<number | undefined> {
    const contents = await read(this.pidfile, 'utf-8')
    return parseInt(contents)
  }

  async serve(): Promise<Startable> {
    this.server.start()

    return this.server
  }

  async start(): Promise<void> {
    const [executable, fileName] = process.argv
    const options = { detached: true, stdio: 'ignore' }

    try {
      await this.pid()
    } catch (error) {
      const server = this.spawn(
        executable,
        [fileName, this.SERVE_METHOD],
        options
      )
      server.unref()
      await write(this.pidfile, server.pid)
    }
  }

  async stop(): Promise<void> {
    const pid = await this.pid()

    this.kill(pid)

    await unlink(this.pidfile).catch(() => {})
  }
}
