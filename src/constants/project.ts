const project: IProjectConstants = {
  name: 'ludens',
  environmentName: process.env.REACT_APP_LUDENS_ENV || 'dev',
  environment: {
    prod: {
      name: 'production',
      api: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3100',
    },
    release: {
      name: 'release',
      api: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3100',
    },
    dev: {
      name: 'development',
      api: 'http://ec2-13-59-185-103.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-13-59-185-103.us-east-2.compute.amazonaws.com:3100',
    },
  },
}

export default project