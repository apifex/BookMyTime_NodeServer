import { Response, Request } from 'express'

export function errorHandler(target: Object, key: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value
    descriptor.value = async function (...args: [Request, Response]) {
      try {
        return await originalFn.call(this, ...args)
      } catch (err) {
        const [req, res] = args
        if (err instanceof Error) res.status(400).send({ error: err.message, requestBody: req.body, requestMethod: req.method, requestHeaders: req.headers })
      }
    }
  }

