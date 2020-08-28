import pages from 'pages'
import route from 'constants/routes'

const routes: IRoutes[] = [
  {
    exact: true,
    name: route.home.name,
    path: route.home.path,
    component: pages.Home,
  },
  {
    exact: true,
    name: route.register.name,
    path: route.register.path,
    component: pages.Register,
  },
  {
    exact: true,
    name: route.registerAffiliate.name,
    path: route.registerAffiliate.path,
    component: pages.Register,
  },
  {
    name: route.main.name,
    path: route.main.path,
    component: pages.Main,
    private: true,
  },
  {
    name: route.deposit.name,
    path: route.deposit.path,
    component: pages.Deposit,
    private: true,
  },
  {
    name: route.withdraw.name,
    path: route.withdraw.path,
    component: pages.Withdraw,
    private: true,
  },
  {
    exact: true,
    name: route.transaction.name,
    path: route.transaction.path,
    component: pages.TransactionList,
    private: true,
  },
  {
    exact: true,
    name: route.transactionDetail.name,
    path: route.transactionDetail.path,
    component: pages.TransactionDetail,
    private: true,
  },
  {
    exact: true,
    name: route.lotto.name,
    path: route.lotto.path,
    component: pages.LottoList,
    private: true,
  },
  {
    exact: true,
    name: route.lottoChrildren.name,
    path: route.lottoChrildren.path,
    component: pages.LottoListChrildren,
    private: true,
  },
  {
    exact: true,
    name: route.lottoMaking.name,
    path: route.lottoMaking.path,
    component: pages.LottoMake,
    private: true,
  },
  {
    exact: true,
    name: route.lottoCheckout.name,
    path: route.lottoCheckout.path,
    component: pages.LottoPayment,
    private: true,
  },
  {
    exact: true,
    name: route.creditInfo.name,
    path: route.creditInfo.path,
    component: pages.CreditInfo,
    private: true,
  },
  {
    exact: true,
    name: route.affiliate.name,
    path: route.affiliate.path,
    component: pages.Affiliate,
    private: true,
  },
  {
    exact: true,
    name: route.lottoFavorite.name,
    path: route.lottoFavorite.path,
    component: pages.LottoFavorite,
    private: true,
  },
  {
    exact: true,
    name: route.contactus.name,
    path: route.contactus.path,
    component: pages.ContactUs,
    private: true,
  },
  {
    exact: true,
    name: route.newsroom.name,
    path: route.newsroom.path,
    component: pages.Newsroom,
    private: true,
  },
  {
    exact: true,
    name: route.forgotPassword.name,
    path: route.forgotPassword.path,
    component: pages.ForgotPassword,
  },
  {
    name: route.notFound.name,
    path: route.notFound.path,
    component: pages.ComingSoon,
  },
]

export default routes