const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const spotimage = require('../../db/models/spotimage');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

router.delete('/:spotImageId', restoreUser, requireAuth, async(req, res)=>{
    let spotImageDataObj = await SpotImage.scope('currentSpot').findByPk(req.params.spotImageId)
    let spotImageDataString = JSON.stringify(spotImageDataObj);
    let spotImage = JSON.parse(spotImageDataString)

    if(!spotImageDataObj){
        res.status(404)
        return res.json({
            message: "Spot image couldn't be found",
            statusCode: 404
        })
    }
    let spotDataObj = await Spot.findByPk(spotImage.spotId)
    let spotDataString = JSON.stringify(spotDataObj);
    let spot = JSON.parse(spotDataString)
    let userDataObj = req.user;
    let userDataString = JSON.stringify(userDataObj);
    let user = JSON.parse(userDataString)
    if(spot.ownerId !== user.id){
        res.status(403)
        return res.json({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    await spotImageDataObj.destroy()
    res.status(200)
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})



module.exports = router;
