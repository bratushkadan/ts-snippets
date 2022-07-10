class A {}

/* 1. Separation between type & value namespaces in TypeScript is a type of declaration merging */
type ClassA = A;
const referenceToClassA = A;

/* 2. Interface extension via declaration merging */
interface Person {
  name: string
}
interface Person {
  age: number
}
const me: Person = {
  name: "Dan",
  age: 19
}

/* libraries interface extension: */
import {RequestHandler} from 'express'
import {nanoid} from 'nanoid'

declare global {
  namespace Express {
    interface Request {
      Locals: {
        requestId: string
        traceId: string
      }
    }
  }
}

const requestIdMiddleware: RequestHandler = (req, _res, next) => {
  req.locals.requestId = req.get('x-requestid') || nanoid(16)
  req.locals.traceId = req.get('x-traceid') || nanoid(16)

  next()
}

export {requestIdMiddleware}