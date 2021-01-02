import {Sequelize} from 'sequelize';

const connection = new Sequelize('contatodb', 'postgres', 'docker', {
  host: 'localhost',
  dialect: 'postgres'
});

export default connection;