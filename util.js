import jwt from "jsonwebtoken";

const getToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });

export { getToken };
