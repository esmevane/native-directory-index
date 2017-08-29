import { promisify } from 'util'

type Promisify = (asyncFunction: Function) => Function

const createCallbackToPromise = (): Promisify => {
  if (typeof promisify !== 'undefined') return promisify

  return (asyncFunction: Function): Function => (
    ...params: any[]
  ): Promise<any> =>
    new Promise((resolve, reject) =>
      asyncFunction(...params, (error: any, result: any): void => {
        if (error) reject(error)

        resolve(result)
      })
    )
}

export default createCallbackToPromise()
