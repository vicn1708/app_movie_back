import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../../schema/users.schema";

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

export const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  return await UserModel.findOne({ _id: jwt_payload.id }).then((user) => {
    if (user) {
      return done(null, jwt_payload);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});
