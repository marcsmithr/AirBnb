const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

router.delete('/:reviewImageId', restoreUser, requireAuth, async(req, res)=>{
    let reviewImageDataObj = await ReviewImage.findByPk(req.params.reviewImageId)
    let reviewImageDataString = JSON.stringify(reviewImageDataObj);
    let reviewImage = JSON.parse(reviewImageDataString)
    console.log('-----------------')
    console.log(reviewImageDataObj)
    console.log('-----------------')
    if(!reviewImageDataObj){
        return res.status(404).send({
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
        return res.status(403).send({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    await reviewImageDataObj.destroy()
    return res.status(200).send({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
