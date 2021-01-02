import {Sequelize} from 'sequelize';
import config from '../config/config'

const connection = new Sequelize(
  config.server.database,
  config.server.user,
  config.server.senha,
  {
    host: config.server.host,
    dialect: 'postgres'
  });

export default connection;