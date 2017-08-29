import { expect } from "chai"
import Server from "./index"

describe(Server.name, () => {
  it("is exported", () => expect(Server).to.be.ok)
})
