const authAdmin = (req, res, next) => {
  const token = "xyzasv";
  const isAuth = token === "xyz";
  if (!isAuth) {
    res.status(401).send("Not Authorized");
  } else {
    next();
  }
};

const userAuth = (req, res,next) => {
  const token = "user";
  const isAuth = token === "user";
  if (!isAuth) {
    res.status(400).send("Not Authorized");
  }else{
    next();
  }
};

module.exports = {
  authAdmin,
  userAuth,
};
