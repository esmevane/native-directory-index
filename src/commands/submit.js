import inquirer from 'inquirer'
import fetch from 'isomorphic-fetch'
import { Config as DefaultConfig, Logger } from '../index'

const isItIos = {
  type: 'confirm',
  name: 'ios',
  default: false,
  message: 'Is it iOS compatible?'
}

const isItAndroid = {
  type: 'confirm',
  name: 'android',
  default: false,
  message: 'Is it Android compatible?'
}

const isItExpo = {
  type: 'confirm',
  name: 'expo',
  default: false,
  message: 'Is it Expo compatible?'
}

const isItWeb = {
  type: 'confirm',
  name: 'web',
  default: false,
  message: 'Is it web compatible?'
}

const getConfirmation = {
  type: 'confirm',
  name: 'ready',
  default: false,

  message: 'Are you ready to submit this project?'
}

const questions = [isItIos, isItAndroid, isItExpo, isItWeb]
const confirm = [getConfirmation]

export const create = (Config = DefaultConfig) => {
  const handler = async ({ repo }) => {
    Logger.info('Looking up your repo details')

    const response = await fetch(Config.packageFor(repo))

    try {
      if (response.status === 200) {
        const json = await response.json()

        Logger.info(
          `Found: ${json.name} - ${json.version}`,
          `Give us some information about ${json.name}`
        )

        const answers = await inquirer.prompt(questions)
        const submission = Object.assign(
          {},
          {
            name: json.name,
            githubUrl: Config.githubUrlFor(repo)
          },
          answers
        )

        Logger.info(
          `Does this look okay?\r\n${JSON.stringify(
            submission,
            null,
            2
          )}`
        )

        const { ready } = await inquirer.prompt(confirm)

        if (ready) {
          Logger.info(`Submitting ${json.name} now...`)
        } else {
          Logger.info(`Okay! Nothing submitted for now.`)
        }
      } else {
        Logger.error(`Unable to locate package for ${repo}`)
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  const toYargs = () => ({
    command: 'submit <repo>',
    desc: 'Submit a repo to the directory',
    builder: () => {},
    handler
  })

  return { toYargs }
}
