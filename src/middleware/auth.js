const authAdmin = (req, res, next) => {
  const token = "xyzasv";
  const isAuth = token === "xyz";
  if (!isAuth) {
    res.status(401).send("Not Authorized");
  } else {
    next();
  }
};

module.exports = {
  authAdmin,
};
