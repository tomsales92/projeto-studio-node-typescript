import {DataTypes, Model} from 'sequelize';
import connection from '../database/connection';

interface IContato extends Model{
  id: number;
  nome: String;
  celular: String;
  email: string;
}

const Contato  = connection.define<IContato>('contato', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  }, 
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  celular: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

Contato.sync({force: false}).then(()=>{});

export default Contato;