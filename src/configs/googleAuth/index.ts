// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://yourdomain:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function (
//       request: any,
//       accessToken: any,
//       refreshToken: any,
//       profile: any,
//       done: any
//     ) {
//       User.findOrCreate(
//         { googleId: profile.id },
//         function (err: any, user: any) {
//           return done(err, user);
//         }
//       );
//     }
//   )
// );
