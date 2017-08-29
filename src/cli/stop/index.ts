import { Loggable } from '../../logger'
import { Serveable } from '../../service'
import { CliAction, CliCommand, CliOptions, defaults } from '../index'

export const DESC = 'Stops a backgrounded native-directory-index service'
export const COMMAND = 'stop'
export const SUCCESS = 'native-directory-index service stopped.'
export const FAILURE = 'Unable to stop native-directory-index service.'

export default class Stop implements CliAction {
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
      await this.service.stop()
      await this.logger.info(SUCCESS)
    } catch (error) {
      await this.logger.error(FAILURE)
      await this.logger.error(JSON.stringify(error))
    }
  }
}
