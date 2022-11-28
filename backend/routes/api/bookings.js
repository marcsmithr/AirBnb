const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();


router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    let Bookings = await Booking.findAll({where:{userId: user.id}})
    Bookings.setDataValue('User', userDataObj)
    return res.json(Bookings)
})




module.exports = router;
