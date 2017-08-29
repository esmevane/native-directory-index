import { Server as HttpServer, createServer } from "http"
import { Express } from "express"
import * as express from "express"
import { json } from "./controllers"
import { echo, health } from "./routes"
import Config from "../config"

export interface Startable {
  start(): Promise<void>
}

export interface ServerOptions {
  config: Config
}

const defaults: ServerOptions = {
  config: new Config()
}

export default class Server implements Startable {
  public server: HttpServer
  public config: Config

  constructor(givenOptions: Partial<ServerOptions> = {}) {
    const options = { ...defaults, ...givenOptions }

    this.config = options.config
  }

  get port(): number {
    return this.config.port
  }

  async start(): Promise<void> {
    const app = this.createApp()
    const server = this.createServer(app)

    app.get("/health", json(health))
    app.get("/echo/:value*?", json(echo, (request: any) => [ request.params.value ]))

    server.listen(this.port, () => console.log(`Listening on ${this.port}`))
  }

  createApp(): Express {
    return express()
  }

  createServer(app: Express): HttpServer {
    return createServer(app)
  }
}
