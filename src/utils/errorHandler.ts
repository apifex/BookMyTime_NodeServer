import {NextFunction, Request, Response} from 'express';

export const errorsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 400
    switch (err.message) {
        case 'Bad Request': 
            statusCode = 400
            break
        default:
            statusCode = 500  
    }
    return res.status(statusCode).send(err.message)
}


// export function asyncWrapper (callback: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
//     console.log('wrapper')
//     return function (req: Request, res: Response, next: NextFunction) {
//         callback(req, res, next).catch(next)
//     }
// }


