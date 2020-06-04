module.exports = {
  database: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'cacapromo',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  debug: process.env.DEBUG || false
}
