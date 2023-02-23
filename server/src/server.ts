import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/routes';
//  Arquivo principal onde será feita inicialização do servidor

const app = Fastify();

//  Registro do cors e das rotas importadas
app.register(cors);
app.register(routes);

//  Subindo servidor
app.listen({
  port: 3333,
  host: '0.0.0.0'
}).then(() => {
  console.log(`✅ Servidor em execução!\nAcesse através do link: http://localhost:3333`)
})