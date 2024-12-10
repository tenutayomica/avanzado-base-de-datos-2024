import "dotenv/config";

export const config = {
    user: 'burgertic_owner',
    host: 'ep-flat-morning-a1r4aenk.ap-southeast-1.aws.neon.tech',
    database: 'burgertic',
    password: 'cY3MCW0bqQRN',
    port: 5432,
    ssl: true,
};

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'postgresql://burgertic_owner:cY3MCW0bqQRN@ep-flat-morning-a1r4aenk.ap-southeast-1.aws.neon.tech/burgertic?sslmode=require'
);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
