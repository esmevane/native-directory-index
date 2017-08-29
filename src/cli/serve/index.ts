import { Loggable } from '../../logger'
import { Serveable } from '../../service'
import { CliAction, CliCommand, CliOptions, defaults } from '../index'

export const DESC = 'Starts a foregrounded native-directory-index server'
export const COMMAND = 'serve'
export const SUCCESS = 'native-directory-index service started.'
export const FAILURE = 'Unable to start native-directory-index service.'

export default class Serve implements CliAction {
  public service: Serveable
  public logger: Loggable

  constructor(givenOptions: Partial<CliOptions> = {}) {
    const options = { ...defaults, ...givenOptions }

    this.logger = options.logger
    this.service = options.service
  }

  toCommand(): CliCommand {
    return {
      command: COMMAND,
      desc: DESC,
      builder: () => {},
      handler: () => this.perform()
    }
  }

  async perform(): Promise<void> {
    try {
      await this.service.serve()
      await this.logger.info(SUCCESS)
    } catch (error) {
      await this.logger.error(FAILURE)
    }
  }
}
