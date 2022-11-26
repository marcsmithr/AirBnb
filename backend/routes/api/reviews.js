const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)

    let Reviews = await Review.findAll({
        where: {userId: user.id}
    })
    let userNoUsername = {}
    userNoUsername.id = user.id;
    userNoUsername.firstName = user.firstName;
    userNoUsername.lastName = user.lastName;

    for(let reviewDataObj of Reviews){
        reviewDataObj.setDataValue('User', userNoUsername)
        let reviewDataString = JSON.stringify(reviewDataObj)
        let review = JSON.parse(reviewDataString)

        let spotDataObj = await Spot.findByPk(review.spotId)
        reviewDataObj.setDataValue('Spot', spotDataObj)

        let reviewImgsDataObj = await ReviewImage.findAll({
            attributes:['id', 'url'],
            where: {id: review.id}
        })
        reviewDataObj.setDataValue('ReviewImages', reviewImgsDataObj)
    }
    res.status(200).send({
        Reviews
    })
})







module.exports = router;
