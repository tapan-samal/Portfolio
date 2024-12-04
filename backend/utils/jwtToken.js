export const sendToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  //Set cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRES || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    token,
    user,
  });
};
