//database configuration
let dbInfo = {
    host: 'projectc-db-instance.cl0nfpe9fpt6.ap-northeast-2.rds.amazonaws.com',
    port: '5432',
    database: 'projectc',
    user: 'dylee',
    password: '2831647d'
}

module.exports = {
    //database configuration
    dbInfo: dbInfo,

    //database connection string
    dbConString: 'postgres://' + dbInfo.user + ':' + dbInfo.password + '@' + dbInfo.host + ':' + dbInfo.port + '/' + dbInfo.database,
};