module.exports = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET_KEY ||  '',
  dbUser: process.env.DB_USER ||  '',
  dbPass: process.env.DB_PASSWORD ||  '',
};
