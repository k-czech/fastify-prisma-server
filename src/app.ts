import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const fastifyServer = Fastify({
  logger: true,
});

fastifyServer.get("/hello", async () => {
  return { hello: "world" };
});

const start = async () => {
  for (const schema of userSchemas) {
    fastifyServer.addSchema(schema);
  }

  fastifyServer.register(
    (app, _opts, done) => {
      userRoutes(app);
      done();
    },
    {
      prefix: "/api/users",
    }
  );

  try {
    await fastifyServer.listen({
      port: 3001,
      host: "0.0.0.0",
    });
    fastifyServer.log.info(
      `server listening on ${fastifyServer.server.address()}`
    );
  } catch (err) {
    fastifyServer.log.error(err);
    process.exit(1);
  }
};

start();
