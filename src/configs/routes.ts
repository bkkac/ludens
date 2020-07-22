import pages from 'pages'

const routes: IRoutes[] = [
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
    name: 'register-affiliate',
    path: '/register-affiliate/:affiliate',
    component: pages.Register,
  },
  {
    name: 'main',
    path: '/main',
    component: pages.Main,
    private: true,
  },
  {
    name: 'deposit',
    path: '/deposit',
    component: pages.Deposit,
    private: true,
  },
  {
    name: 'withdraw',
    path: '/withdraw',
    component: pages.Withdraw,
    private: true,
  },
  {
    exact: true,
    name: 'transaction',
    path: '/transaction',
    component: pages.TransactionList,
    private: true,
  },
  {
    exact: true,
    name: 'transaction-detail',
    path: '/transaction/detail',
    component: pages.TransactionDetail,
    private: true,
  },
  {
    exact: true,
    name: 'lotto',
    path: '/lotto',
    component: pages.LottoList,
    private: true,
  },
  {
    exact: true,
    name: 'lotto',
    path: '/lotto/:type',
    component: pages.LottoListChrildren,
    private: true,
  },
  {
    exact: true,
    name: 'lotto',
    path: '/lotto/making/:type',
    component: pages.LottoMake,
    private: true,
  },
  {
    exact: true,
    name: 'credit-info',
    path: '/credit-info',
    component: pages.CreditInfo,
    private: true,
  },
  {
    exact: true,
    name: 'affiliate',
    path: '/affiliate',
    component: pages.Affiliate,
    private: true,
  },
  {
    name: '404',
    path: '*',
    component: pages.ComingSoon,
  },
]

export default routes