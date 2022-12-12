const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// const validations = async(firstName, lastName, username)=>{

// }

router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;
      if(!credential||!password){
        res.status(400)
        return res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            credential: 'Email or username is required',
            password: "Password is required"}
        })
      }
      const user = await User.login({ credential, password });

      if (!user) {
       res.status(401)
       return res.json({
          message: "Invalid credentials",
          statusCode: 401,
          errors:{
            credential: 'Invalid credential'
          }
        })
      }

      let newToken = await setTokenCookie(res, user);
      user.setDataValue('token', newToken)
      return res.json({
        user: user
      });
    }
  );



  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;
