const getBearerToken = (req) => {
  const authHeader = req.headers.authorization;

  const bearerToken = authHeader ? authHeader.split(" ")[1] : null;

  return bearerToken;
};

export default getBearerToken;
