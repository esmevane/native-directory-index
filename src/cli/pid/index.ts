import { Loggable } from '../../logger'
import { Serveable } from '../../service'
import { CliAction, CliCommand, CliOptions, defaults } from '../index'

export const DESC = 'Reports a local native-directory-index service PID, if any'
export const COMMAND = 'pid'
export const FAILURE = 'No native-directory-index service found.'

export default class Pid implements CliAction {
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
      const pid = await this.service.pid()
      await this.logger.info(`${pid}`)
    } catch (error) {
      await this.logger.error(FAILURE)
      await this.logger.error(JSON.stringify(error))
    }
  }
}
