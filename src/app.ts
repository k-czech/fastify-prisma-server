import Fastify, { errorCodes } from "fastify";
import { authRoutes } from "./modules/auth/auth.route";
import { authSchemas } from "./modules/auth/auth.schema";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const fastifyServer = Fastify({
  logger: true,
});

const start = async () => {
  for (const schema of [...authSchemas, ...userSchemas]) {
    fastifyServer.addSchema(schema);
  }

  fastifyServer.register(
    (app, _opts, done) => {
      authRoutes(app);
      userRoutes(app);
      done();
    },
    {
      prefix: "/api/v1",
    }
  );

  fastifyServer.setErrorHandler((error, _, res) => {
    if (error.code === errorCodes.FST_ERR_VALIDATION().code) {
      res.status(422).send({
        message: "The form contains errors!",
        code: 422,
      });
    } else {
      console.log({ error });

      res.send(error);
    }
  });

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
