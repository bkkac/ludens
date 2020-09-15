const project: IProjectConstants = {
  name: 'ludens',
  environmentName: process.env.REACT_APP_LUDENS_ENV || 'dev',
  environment: {
    prod: {
      name: 'prod',
      api: 'http://ec2-13-59-185-103.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-13-59-185-103.us-east-2.compute.amazonaws.com:3100',
    },
    release: {
      name: 'release',
      api: 'http://ec2-3-1-196-179.ap-southeast-1.compute.amazonaws.com/api',
      socket: 'http://ec2-3-1-196-179.ap-southeast-1.compute.amazonaws.com:3100',
    },
    dev: {
      name: 'dev',
      api: 'http://ec2-54-255-215-126.ap-southeast-1.compute.amazonaws.com/api',
      socket: 'http://ec2-54-255-215-126.ap-southeast-1.compute.amazonaws.com:3100',
    },
  },
}

export default project