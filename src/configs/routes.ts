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
    name: 'main',
    path: '/main',
    component: pages.Main,
  },
  {
    name: 'deposit',
    path: '/deposit',
    component: pages.Deposit,
  },
  {
    name: 'withdraw',
    path: '/withdraw',
    component: pages.Withdraw,
  },
  {
    name: '404',
    path: '',
    component: pages.ComingSoon,
  },
]

export default routes