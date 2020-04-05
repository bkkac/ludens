import createRouter, { Router } from 'router5'
import loggerPlugin from 'router5-plugin-logger'
import routes from './routes'

function configureRouter(): Router<Record<string, any>> {
  const router = createRouter(routes, {
    defaultRoute: 'home',
  })

  router.usePlugin(loggerPlugin)

  return router
}

export default configureRouter