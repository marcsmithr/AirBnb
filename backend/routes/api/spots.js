const express = require('express');
const { Spot, Review, sequelize } = require('../../db/models');

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
    console.log(spot)
    let reviews = await Review.findAll({
        where: {
            spotId: spot.id
        }
            })


                let reviewSum = 0;
                for (let review of reviews){
                        reviewSum += review.stars
                    }
                    let reviewAverage = reviewSum / reviews.length;
                    spot.setDataValue('avgRating', reviewAverage)
                    spot.setDataValue('avgRating', reviewAverage)
                    console.log(spotsWithRating)
                    spotsWithRating.push(spot)
}




return res.json(spotsWithRating)
});







module.exports = router;
