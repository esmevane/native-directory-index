export interface ConfigOptions {
  environment: string
  port: number
}

export const defaults: ConfigOptions = {
  environment: "development",
  port: 9500
}

export default class Config {
  public environment: string
  public port: number

  constructor(givenOptions: Partial<ConfigOptions> = {}) {
    const options = { ...defaults, ...givenOptions }

    this.environment = options.environment
    this.port = options.port
  }
}