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
        return res.status(400).send({
          message: "Validation error",
          statusCode: 400,
          errors: {
            credential: 'Email or username is required',
            password: "Password is required"}
        })
      }
      const user = await User.login({ credential, password });

      if (!user) {
       return res.status(401).send({
          message: "Invalid credentials",
          statusCode: 401
        })
      }

      let newToken = await setTokenCookie(res, user);
      user.setDataValue('token', newToken)
      return res.json({
        user: user
      });
    }
  );


//Get Current User: provided version
  // router.get(
  //   '/',
  //   restoreUser,
  //   (req, res) => {
  //     const { user } = req;
  //     if (user) {
  //       return res.json({
  //         user: user.toSafeObject()
  //       });
  //     } else return res.json({ user: null });
  //   }
  // );
//Get Current User: self made version
  router.get('/', restoreUser, requireAuth, async(req, res)=>{

    let user = await User.scope("currentUser").findByPk(req.user.id)
    res.json(user)
  })

module.exports = router;
