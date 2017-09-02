import { readdirSync } from 'fs'
import { resolve } from 'path'

const files = readdirSync(resolve(__dirname, 'commands'))
const retrieve = file => require(resolve(__dirname, 'commands', file))
const exportables = files.map(retrieve)

export default exportables
