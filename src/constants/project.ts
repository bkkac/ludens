
const project: IProjectConstants = {
  name: 'ludens',
  environmentName: 'dev',
  environment: {
    prod: {
      name: 'production',
      api: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3001',
    },
    release: {
      name: 'release',
      api: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3001',
    },
    dev: {
      name: 'development',
      api: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-3-18-105-241.us-east-2.compute.amazonaws.com:3001',
    },
  },
}

export default project