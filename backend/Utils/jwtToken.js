// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
      // expires: new Date(
      //   Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      // ),
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendToken;
