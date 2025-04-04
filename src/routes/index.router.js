import express from "express"
import estudiantesRouter from "./estudiantes.router.js"
import temariosRouter from "./temarios.router.js"
import usersRouter from "./users.router.js"

export const routerApi = (app) => {
  const router = express.Router()

  app.use("/api/v1", router)                    
  router.use('/estudiantes', estudiantesRouter)
  router.use('/temarios', temariosRouter)
  router.use('/users', usersRouter)

}

