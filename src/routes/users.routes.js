const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router();

// Permite, nega, fiscaliza ou direciona uma request
// function Middleware(req, res, next) {

//   if (!req.body.isAdmin) {
//     return res.json({
//       message: "user unauthorized"
//     })
//   }

//   console.log("Autorizado pelo Middleware");
//   console.log(req.body);
//   next();
// }

const usersController = new UsersController();
// aplicar Middleware para todas as rotas
// usersRoutes.use(Middleware);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

// usersRoutes.post("/", Middleware, usersController.create)
// usersRoutes.post("/", Middleware, usersController.index)
// usersRoutes.post("/", Middleware, usersController.show)
// usersRoutes.post("/", Middleware, usersController.update)
// usersRoutes.post("/", Middleware, usersController.delete)

module.exports = usersRoutes;