const express = require('express');
const { Spot, Review, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
let spots = await Spot.findAll({
    include: {
        model: Review,
        attributes: []
    }
    ,
    attributes:{
        include: [
            [
                sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                "avgRating"
            ]
        ]
    },
    group: ['spot.Id']
}
)



// let spotsWithRating = []
// for(let spot of spots){
//     spot = spot.toJSON()
//     let reviewAverage = await Review.AVG('stars', {
//         where: {
//             spotId: spot.Id
//         }
//     })
//     spot.setDataValue('avgRating', reviewAverage)

    //     let reviewSum = 0
//     spot.Reviews.forEach(review => {
//         reviewSum += review.stars
//     });
//     let reviewAverage = reviewSum / spot.Reviews.length;
//     spot.setDataValue('avgRating', reviewAverage)
//     delete spot.Reviews
//     console.log(spotsWithRating)
//     spotsWithRating.push(spot)
// }




return res.json(spots)
});







module.exports = router;
