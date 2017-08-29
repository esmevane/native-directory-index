import { Loggable } from '../../logger'
import { Serveable } from '../../service'
import { CliCommand, CliOptions, defaults } from '../index'

export const DESC = 'Starts a native-directory-index service in the background'
export const COMMAND = 'start'
export const SUCCESS = 'native-directory-index service started.'
export const FAILURE = 'Unable to start native-directory-index service.'

export default class Start {
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
      await this.service.start()
      await this.logger.info(SUCCESS)
    } catch (error) {
      await this.logger.error(FAILURE)
    }
  }
}
