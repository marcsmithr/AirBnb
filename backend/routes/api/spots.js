const express = require('express');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
let spots = await Spot.findAll(
    {
    include: {
        model: Review,
        attributes: []
    }

})

let spotsWithRating = []
for(let spot of spots){
    let reviews = await Review.findAll({
        where: {
            spotId: spot.id
        }
            })
    let previewImage = await SpotImage.findAll({
        where: {
            spotId: spot.id,
            preview: true
            }
        })
        previewImage = JSON.stringify(previewImage)
    let url = previewImage[0].url //this is undefined for some reason, previewImages returns an object with the url inside
    console.log(previewImage)

    let reviewSum = 0;
    for (let review of reviews){
         reviewSum += review.stars
     }
    let reviewAverage = reviewSum / reviews.length;
    spot.setDataValue('avgRating', reviewAverage)
    spot.setDataValue('previewImage', url)

}




return res.json(spots)
});







module.exports = router;
