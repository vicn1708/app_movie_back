import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import AccountModel from "../../schema/accounts.schema";

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

export const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  return await AccountModel.findOne({ _id: jwt_payload.data.accountId }).then(
    (user) => {
      if (user) {
        return done(null, jwt_payload);
      }

      return done(null, false);
      // or you could create a new account
    }
  );
});
