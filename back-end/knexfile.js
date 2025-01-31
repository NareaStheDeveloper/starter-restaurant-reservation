/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://txbsoqas:4pGAdYVsbzWFDbmhzn8OlhAYT5Oc-fuF@fanny.db.elephantsql.com/txbsoqas",
  DATABASE_URL_DEVELOPMENT = "postgres://jrxbdqor:XjNrWAQP6Qz8k_N_QKje5nAsGmyct0xG@castor.db.elephantsql.com/jrxbdqor",
  DATABASE_URL_TEST = "postgres://oxttpnow:g9IyOMJZ6bRwM8YMhU_veQIg_EuzFKYe@castor.db.elephantsql.com/oxttpnow",
  DATABASE_URL_PREVIEW = "postgres://bufotzhr:Neci8-P6-AjvozfR0fKiSG2tOA15Zgb0@fanny.db.elephantsql.com/bufotzhr",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
