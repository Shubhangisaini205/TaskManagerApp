const express = require("express");
const passport = require("../configs/passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err || !user) {
        return res.redirect("https://task-manager-app-hazel-nu.vercel.app/login");
      }
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return res.redirect("https://task-manager-app-hazel-nu.vercel.app/login");
        }
        next();
      });
    })(req, res, next);
  },
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, username: req.user.first_name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.redirect(
      `https://task-manager-app-hazel-nu.vercel.app?token=${token}&user=${JSON.stringify(req.user)}`
    );
  }
);

module.exports = router;
