const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = "postgres://rsslluhbptbsrt:698f4f0972a558e0dd80beda6241d21a7ddb331e526da6e96bc9c06dd83478c3@ec2-35-168-122-84.compute-1.amazonaws.com:5432/d38scg95rqaku3";
const proConfig = process.env.DATABASE_URL; //heroku addons
const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;