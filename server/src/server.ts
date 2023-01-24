import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/routes';

const app = Fastify();
const port = 3333;

app.register(cors);
app.register(routes);

app.listen({
  port
}).then(() => {
  console.log(`✅ Servidor em execução!\nAcesse através do link: http://localhost:${port}`)
})