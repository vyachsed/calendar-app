var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");

var UserSchema = mongoose.Schema({
  login: String,
  password: String,
  notes: [
    {
      event: { type: Schema.Types.ObjectId, ref: "Event" },
      note: String
    }
  ]
});

UserSchema.statics.checkAuth = ({ block = true } = {}) => (req, res, next) => {
  const jwt_token = req.cookies.jwt_token;
  if (!jwt_token && block)
    return res.json({
      status: "error",
      code: "NOT_AUTHORIZED"
    });

  try {
    req.user = jwt.verify(jwt_token, process.env.JWT_TOKEN);
  } catch (err) {
    if (block) {
      return res.json({
        status: "error",
        code: "NOT_AUTHORIZED"
      });
    }
  }

  next();
};

UserSchema.methods.getJwtToken = function() {
  const { _id, password, login } = this;

  return jwt.sign(
    {
      _id,
      password,
      login
    },
    process.env.JWT_TOKEN
  );
};

var User = mongoose.model("User", UserSchema);
module.exports = User;
