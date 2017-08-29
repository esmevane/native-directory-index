import { expect } from "chai"
import Config from "./config"

describe("Config", () => {
  describe("port", () => {
    it("has a default port", () => {
      const config = new Config()
      expect(config.port).to.eql(9500)
    })

    it("allows an arbitrary port", () => {
      const port = 9000
      const config = new Config({ port })
      expect(config.port).to.eql(port)
    })
  })

  describe("environment", () => {
    it("has a default environment", () => {
      const config = new Config()
      expect(config.environment).to.eql("development")
    })

    it("allows an arbitrary environment", () => {
      const environment = "testing"
      const config = new Config({ environment })
      expect(config.environment).to.eql(environment)
    })
  })
})