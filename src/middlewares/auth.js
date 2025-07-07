const adminAuth = (req, res, next) => {
  const token = "abc";
  const adminAuth = token === "abc";
  if (!adminAuth) {
    res.status(401).send("401 Error");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
