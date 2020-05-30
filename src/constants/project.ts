
const project: IProjectConstants = {
  name: 'ludens',
  environmentName: 'dev',
  environment: {
    prod: {
      name: 'production',
      api: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3100',
    },
    release: {
      name: 'release',
      api: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3100',
    },
    dev: {
      name: 'development',
      api: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3000/api',
      socket: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3100',
    },
  },
}

export default project