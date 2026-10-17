import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value?.toLowerCase(),
          emailVerified: profile._json?.email_verified === true,
          avatar: profile.photos?.[0]?.value || null,
        };

        if (!googleUser.email || !googleUser.emailVerified) {
          return done(null, false, {
            message: "Google email is missing or not verified",
          });
        }

        return done(null, googleUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
