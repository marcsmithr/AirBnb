const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

router.delete('/:reviewImageId', restoreUser, requireAuth, async(req, res)=>{
    let reviewImageDataObj = await ReviewImage.findByPk(req.params.reviewImageId)
    let reviewImageDataString = JSON.stringify(reviewImageDataObj);
    let reviewImage = JSON.parse(reviewImageDataString)

    if(!reviewImageDataObj){
        res.status(404)
        return res.json({
            message: "review image couldn't be found",
            statusCode: 404
        })
    }
    let reviewDataObj = await Review.findByPk(reviewImage.reviewId)
    let reviewDataString = JSON.stringify(reviewDataObj);
    let review = JSON.parse(reviewDataString)
    let userDataObj = req.user;
    let userDataString = JSON.stringify(userDataObj);
    let user = JSON.parse(userDataString)

    if(review.userId !== user.id){
        res.status(403)
        return res.json({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    await reviewImageDataObj.destroy()
    res.status(200)
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
