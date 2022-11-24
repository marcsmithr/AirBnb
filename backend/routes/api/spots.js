const express = require('express');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/', async (req, res) => {
//grab all spots while having access to Reviews, without showing Reveiw data
let spots = await Spot.findAll(
    {
    include: {
        model: Review,
        attributes: []
    }

})

//iterate through spots to manipulate each spot
    for(let spot of spots){
        //grab all reviews
        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
                })
            //grab all SpotImages
        let previewImage = await SpotImage.findAll({
            where: {
                spotId: spot.id,
                preview: true
                }
            })
            //Turn previewImage into something that can be keyed into
            let previewImageString = JSON.stringify(previewImage)
            let previewImageObj = JSON.parse(previewImageString)
            //grab url from previewImage
            let url;
        if(previewImageObj[0]){
            url = previewImageObj[0].url
        }

        //itterate through review to add all the star reviews
        let reviewSum = 0;
        for (let review of reviews){
            reviewSum += review.stars
        }
        let reviewAverage = reviewSum / reviews.length;
        //set the data into each spot
        spot.setDataValue('avgRating', reviewAverage)
        if(url){
        spot.setDataValue('previewImage', url)
        }
    }
return res.json(spots)
});

// router.post('/', requireAuth, async(req, res)=>{

// })







module.exports = router;
