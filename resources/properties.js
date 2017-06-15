//database configuration
let dbInfo = {
    host: '',
    port: '',
    database: '',
    user: '',
    password: ''
}

module.exports = {
    //database configuration
    dbInfo: dbInfo,

    //database connection string
    dbConString: 'postgres://' + dbInfo.user + ':' + dbInfo.password + '@' + dbInfo.host + ':' + dbInfo.port + '/' + dbInfo.database,
};