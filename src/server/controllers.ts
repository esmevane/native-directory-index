import { RequestHandler } from "express"

export const json = (handler: Function, getParams?: Function): RequestHandler =>
  async (request: any, response: any) => {
    try {
      const params = getParams ? await getParams(request, response) : []
      const result = await handler(...params)

      return response.json(result || { status: "OK" })
    } catch (error) {
      return response.status(500).json({ error })
    }
  }