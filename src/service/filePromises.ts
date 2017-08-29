import * as fs from 'fs'
import callbackToPromise from './callbackToPromise'

export const read = callbackToPromise(fs.readFile)
export const write = callbackToPromise(fs.writeFile)
export const unlink = callbackToPromise(fs.unlink)
export const stat = callbackToPromise(fs.stat)
