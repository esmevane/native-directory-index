import fetch from 'isomorphic-fetch'
import { Config as DefaultConfig, Logger } from '../index'

export const create = (Config = DefaultConfig) => {
  const perform = async () => {
    const response = await fetch(Config.directory)

    try {
      const json = await response.json()

      json.forEach(item => Logger.info(item.githubUrl))
    } catch (error) {
      Logger.error(error)
    }
  }

  const toYargs = () => ({
    command: 'published',
    desc: 'See list of published repos',
    builder: () => {},
    handler: perform
  })

  return { perform, toYargs }
}
