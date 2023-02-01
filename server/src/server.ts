import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/routes';
//  Arquivo principal onde será feita inicialização do servidor

const app = Fastify();
const port = 3333;

//  Registro do cors e das rotas importadas
app.register(cors);
app.register(routes);

//  Subindo servidor
app.listen({
  port
}).then(() => {
  console.log(`✅ Servidor em execução!\nAcesse através do link: http://localhost:${port}`)
})