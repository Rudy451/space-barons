const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config({path: `${__dirname}/../.env`});

const DATABASE = process.env.DATABASE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const dbConfig = {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
}

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, dbConfig);

const GameCards = sequelize.define('GameCards', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cardType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  planetName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  planetPhoto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photoDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  outstandingSharesChange: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  sharePriceChange: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  cards: GameCards
};

module.exports = db;
