import jwt from "jsonwebtoken";

const getToken = (user) => {
  const { _id, name, email, isAdmin } = user;
  jwt.sign(
    {
      _id,
      name,
      email,
      isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (error, decode) => {
      if (error) return res.status(401).send({ message: "Invalid token" });
      req.user = token;
      return next();
    });
  }
  req.status(401).send({ message: "Token missing" });
};

const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  } else {
    return res.status(401).send({ message: "Admin token is invalid" });
  }
};

export { getToken, isAuth, isAdmin };
