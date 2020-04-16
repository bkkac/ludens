import pages from 'pages'

const routes: IRoutes[] = [
  {
    name: 'comingSoon',
    path: '/comingSoon',
    component: pages.ComingSoon,
  },
  {
    exact: true,
    name: 'home',
    path: '/',
    component: pages.Home,
  },
  {
    name: 'register',
    path: '/register',
    component: pages.Register,
  },
  {
    name: '404',
    path: '',
    component: pages.ComingSoon,
  },
]

export default routes