const { join, dirname } = require('path');
const { fileURLToPath } = require('url');
const swaggerAutogen = require('swagger-autogen');

const port = Number(process.env.PORT) || 5000;
const _dirname = dirname(fileURLToPath(require('url').pathToFileURL(__filename).toString()));

const doc = {
  info: {
    title: 'Users API',
    description: 'My users API',
  },
  definitions: {
    User: {
      email: 'test',
      password: 'test',
    },
    Users: [
      {
        $ref: '#/definitions/User',
      },
    ],
  },
  host: `localhost:${port}`,
  basePath: '/api',
  schemes: ['http']
}

const outputFile = join(_dirname, 'output.json');
const endpointsFiles = [
  join(_dirname, '../src/routes/authRoutes.ts'),
  join(_dirname, '../src/routes/usersRoutes.ts'),
];

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
  console.log(`Generated: ${success}`)
});