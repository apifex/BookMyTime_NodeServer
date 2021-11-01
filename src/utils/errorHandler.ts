import { Request, Response} from 'express';

export async function errorHandler(res: Response, req: Request, promise: any) {
    try {
        await promise()
    }
    catch (err) {
        if (err instanceof Error) res.status(400).send({error: err.message, requestBody: req.body, requestMethod: req.method, requestHeaders: req.headers})
    }
}

