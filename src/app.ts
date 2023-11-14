import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";

const fastifyServer = Fastify({
  logger: true,
});

fastifyServer.get("/hello", async () => {
  return { hello: "world" };
});

const start = async () => {
  fastifyServer.register(userRoutes, { prefix: "/api/users" });

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
