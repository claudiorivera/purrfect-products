import jwt from "jsonwebtoken";

module.exports = (user) => {
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
