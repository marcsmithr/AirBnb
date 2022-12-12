
// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();




router.post(
    '/',
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      let doesEmailExist = await User.findOne({
        where:{
          email: email
        }
      })

      if(doesEmailExist){
        res.status(403)
        return res.json({
          message: 'email already in use'
        })
      }
      try {
        const user = await User.signup({ email, username, password, firstName, lastName });

        await setTokenCookie(res, user);

        return res.json({
          user: user
        });

      } catch (error) {
        res.status(400)
        return res.json({
          message: 'Invalid first name, last name, or username',
          errors: {
            invalidInput: 'Invalid first name, last name, or username'
          }
        })
      }
    }
  );





module.exports = router;
