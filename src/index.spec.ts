import { expect } from "chai"
import { Cli, Config, Logger, Server, Service } from "./index"

describe("Project-wide exports", () => {
  it(`exports ${Cli.name}`, () => expect(Cli).to.be.ok)
  it(`exports ${Config.name}`, () => expect(Config).to.be.ok)
  it(`exports ${Logger.name}`, () => expect(Logger).to.be.ok)
  it(`exports ${Server.name}`, () => expect(Server).to.be.ok)
  it(`exports ${Service.name}`, () => expect(Service).to.be.ok)
})
