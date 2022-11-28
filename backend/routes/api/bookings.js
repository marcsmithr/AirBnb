const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();


router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    let userNoUsername = {}
        userNoUsername.id = user.id;
        userNoUsername.firstName = user.firstName;
        userNoUsername.lastName = user.lastName;

    let Bookings= await Booking.findAll({where:{userId: user.id}})
    for(let bookingDataObj of Bookings){
        bookingDataObj.setDataValue('User', userNoUsername)
}
res.status(200).send({
    Bookings
})
})





module.exports = router;
