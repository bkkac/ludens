const project: IProjectConstants = {
  name: 'ludens',
  environmentName: process.env.REACT_APP_LUDENS_ENV || 'dev',
  environment: {
    prod: {
      name: 'prod',
      api: 'http://ec2-3-1-8-213.ap-southeast-1.compute.amazonaws.com/api',
      socket: 'http://ec2-3-1-8-213.ap-southeast-1.compute.amazonaws.com:3200',
    },
    release: {
      name: 'release',
      api: 'http://ec2-3-1-196-179.ap-southeast-1.compute.amazonaws.com/api',
      socket: 'http://ec2-3-1-196-179.ap-southeast-1.compute.amazonaws.com:3200',
    },
    dev: {
      name: 'dev',
      api: 'http://ec2-13-229-225-80.ap-southeast-1.compute.amazonaws.com/api',
      socket: 'http://ec2-13-229-225-80.ap-southeast-1.compute.amazonaws.com:3200',
    },
  },
}

export default project