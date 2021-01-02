import express from 'express';
import connection from './database/connection';
import Contato from './models/Contato';
import nodemailer from 'nodemailer';
import infoEmail from './config/config';
const app = express();
app.use(express.json());

interface IContato{
  id: number;
  nome: String;
  celular: String;
  email: string;
}

connection
    .authenticate()
    .then(() => {
        console.log('Conexao feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


app.get('/', (req, res)=>{
  res.json({message: '2021'});
});

app.get("/contato", async (req, res) => {
  try {
    const contatos: IContato[] = await Contato.findAll({
      raw: true,
      order: [
          ['id', 'DESC']]
      });

    res.status(200).json(contatos);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.post("/contato", async (req, res) => {
  try {
    const {nome, celular, email}: IContato = req.body;
    const findEmail = await Contato.findOne({where: { email: email }});
    if(findEmail){
      res.json({erro: 'Email já Cadastrado'}); 
    } else {
 
    const contato = await Contato.create({
      nome: nome,
      celular: celular,
      email: email
    });

    //Envio de Email
    var remetente =  nodemailer.createTransport({

      host: 'smtp.gmail.com.',
      port: 587,
      secure: false,
      auth: {
          user: infoEmail.email.user,
          pass: infoEmail.email.senha
      }
  });

  var emailASerEnviado = {
      from: infoEmail.email.user,
      to: email,
      subject: 'Contato',
      text: 'Olá ' + nome + ' recebemos a sua mensagem. Em breve nós iremos  te responder. Obrigado pelo contato',
  };


  remetente.sendMail(emailASerEnviado, function (error) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email enviado com sucesso.');
      }
  });

  res.json(contato);
  }

  } catch (e) {
    res.status(404).send(e.message);
  }
});


app.listen(3333, ()=> {console.log("Servidor ok")});