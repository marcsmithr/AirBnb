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
    return res.status(200).send({
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
    return res.status(200).send({
        id: newReviewImg.id,
        url: url
    })
})

router.get('/:spotId/reviews', restoreUser, requireAuth, async(req, res)=>{
    let spotDataObj = await Spot.findByPk(req.params.spotId);
    let spotDataString = JSON.stringify(spotDataObj);
    let spot = JSON.parse(spotDataString)
    let reviews = await Review.findAll({
        where: {spotId: spot.id}
    })
    return res.status(200).send({Reviews: reviews})
})


router.put('/:reviewId', restoreUser, requireAuth, async(req, res)=>{
    const{review, stars} = req.body
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)

    let reviewDataObj = await Review.findByPk(req.params.reviewId)
    if(!reviewDataObj){
        return res.status(404).send({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    let reviewObjString = JSON.stringify(reviewDataObj)
    let reviewObj = JSON.parse(reviewObjString)

    if(user.id !== reviewObj.userId){
        return res.status(403).send({
            message: "Only the review owner can edit their review",
            statusCode: 403
        })
    }

    if(!review || !stars || stars < 1 || stars > 5){
        return res.status(400).send({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }
        })
    }
    reviewDataObj.set({
        review,
        stars
    })
    await reviewDataObj.save()

    return res.json(reviewDataObj)
})

router.delete('/:reviewId', restoreUser, requireAuth, async(req, res)=>{
    let review = await Review.findByPk(req.params.reviewId);
    if(!review){
        return res.status(404).send({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    let reviewStringObj = JSON.stringify(review);
    let reviewReadable = JSON.parse(reviewStringObj)
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    if(reviewReadable.userId !== user.id){
        return res.status(403).send({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    await review.destroy();
    return res.status(200).send({
        message: "Successfully deleted",
        statusCode: 200
    })
})






module.exports = router;
