import fetch from 'isomorphic-fetch'
import { Config as DefaultConfig, Logger } from '../index'

export const create = (Config = DefaultConfig) => {
  const handler = async ({ repo }) => {
    Logger.info(`Looking for details on ${repo}`)

    const response = await fetch(Config.packageFor(repo))

    try {
      if (response.status === 200) {
        const json = await response.json()

        Logger.info(`Found: ${json.name} - ${json.version}`)
      } else {
        Logger.error(`Unable to locate package for ${repo}`)
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  const toYargs = () => ({
    command: 'preview <repo>',
    desc: 'Preview summary of a repo',
    builder: () => {},
    handler
  })

  return { toYargs }
}
