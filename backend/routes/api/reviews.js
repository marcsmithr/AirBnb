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

router.post('/:reviewId/images', restoreUser, requireAuth, async(req, res)=>{
    const{url} = req.body;
    let reviewDataObj = await Review.findByPk(req.params.reviewId);
    if(!reviewDataObj){
        return res.status(404).send({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    let reviewDataString = JSON.stringify(reviewDataObj);
    let review = JSON.parse(reviewDataString);
    let reviewImages = ReviewImage.findAll({where: {reviewId: review.id} })
    if(reviewImages.length >= 10){
        return res.status(403).send({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }
    let newReviewImg = await ReviewImage.create({
        reviewId: review.id,
        url
    })
    res.status(200).send({
        id: newReviewImg.id,
        url: url
    })

})







module.exports = router;
