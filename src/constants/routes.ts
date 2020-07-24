export default {
  notFound: { name: '404', path: '*', exactPath: '*' },
  home: { name: 'home', path: '/', exactPath: '/' },
  register: { name: 'register', path: '/register', exactPath: '/register' },
  registerAffiliate: {
    name: 'register-affiliate',
    path: '/register/:affiliate',
    exactPath: (affiliate: string) => `/register/${affiliate}`,
  },
  main: { name: 'main', path: '/main', exactPath: '/main' },
  deposit: { name: 'deposit', path: '/deposit', exactPath: '/deposit' },
  withdraw: { name: 'withdraw', path: '/withdraw', exactPath: '/withdraw'  },
  transaction: { name: 'transaction', path: '/transaction', exactPath: '/transaction'  },
  transactionDetail: { name: 'transaction-detail', path: '/transaction/detail', exactPath: '/transaction/detail'  },
  lotto: { name: 'lotto', path: '/lotto', exactPath: '/lotto' },
  lottoChrildren: {
    name: 'lotto-chrildren', path: '/lotto/:type', exactPath: (type: string) => `/lotto/${type}`,
  },
  lottoMaking: {
    name: 'lotto-making', path: '/lotto/making/:type', exactPath: (type: string) => `/lotto/making/${type}`,
  },
  lottoCheckout: { name: 'lotto-checkout', path: '/checkout/lotto', exactPath: '/checkout/lotto' },
  creditInfo: { name: 'credit-info', path: '/credit-info', exactPath: '/credit-info' },
  affiliate: { name: 'affiliate', path: '/affiliate', exactPath: '/affiliate' },
}