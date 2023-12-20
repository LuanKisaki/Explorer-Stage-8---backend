const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { request } = require("express");

function ensureAuthenticated(req, res, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    req.user = {
      id: Number(user_id),
    };

    console.log("Autorizado pelo Middleware");
    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}
module.exports = ensureAuthenticated;