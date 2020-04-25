
const project: IProjectConstants = {
  name: 'ludens',
  environment: {
    prod: {
      name: 'production',
      api: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3000/api',
    },
    release: {
      name: 'release',
      api: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3000/api',
    },
    dev: {
      name: 'development',
      api: 'http://ec2-18-191-209-242.us-east-2.compute.amazonaws.com:3000/api',
    },
  },
}

export default project