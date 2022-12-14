const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/auth')
const {check }= require('express-validator')
const Op = Sequelize.Op

const router = express.Router();

const validateSpots = [
    check('address')
    .notEmpty()
    .withMessage('Street address is required'),
    check('city')
    .notEmpty()
    .withMessage('City is required'),
    check('state')
    .notEmpty()
    .withMessage('State is required'),
    check('country')
    .notEmpty()
    .withMessage('Country is required'),
    check('lat')
    .notEmpty()
    .isDecimal()
    .withMessage('Latitude is not valid'),
    check('lng')
    .notEmpty()
    .isDecimal()
    .withMessage('Longitude is required'),
    check('name')
    .notEmpty()
    .isLength({max:50})
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .notEmpty()
    .withMessage('Description is required'),
    check('price')
    .notEmpty()
    .withMessage('Price per day is required'),
    handleValidationErrors
]


router.get('/', async (req, res) => {
    let query = {
        where: {},
        include: []
    }
const page = req.query.page;
//  === undefined ? 1 : parseInt(req.query.page);
const size = req.query.size;
// === undefined ? 5 : parseInt(req.query.size);
if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

if(req.query.minLat){
    query.where.lat= {[Op.gte] : minLat}
}
if(req.query.maxLat){
    query.where.lat = {[Op.lte]: maxLat}
}
if(req.query.minLng){
    query.where.lng = {[Op.gte] : minLng}
}
if(req.query.maxLng){
    query.where.lng = {[Op.lte]: maxLng}
}
if(req.query.minPrice < 0){
    req.query.minPrice = 0
}
if(req.query.maxPrice < 0){
    req.query.maxPrice = 0
}
if(req.query.minPrice){
    query.where.price = {[Op.gte]: minPrice}
}
if(req.query.maxPrice){
    query.where.price = {[Op.lte]: maxPrice}
}

//grab all spots while having access to Reviews, without showing Reveiw data
let Spots = await Spot.scope('getAll').findAll(query)

//iterate through spots to manipulate each spot
    for(let spot of Spots){
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

if(page || size){
    return res.json({
        Spots,
        page,
        size
    })
}
return res.json({
    Spots
})
});


router.post('/', restoreUser, requireAuth, validateSpots, async(req, res)=>{
    const {
        address, city,
        state, country,
        lat, lng,
        name, description,
        price
    } = req.body;
    let ownerDataObj = await User.scope("currentUser").findByPk(req.user.id)
    let ownerDataString = JSON.stringify(ownerDataObj)
    let owner = JSON.parse(ownerDataString)

    if(!address||!city||!state||!country||!lat||!lng||!name||!description||!price){
        res.status(400)
        return res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            address: 'Street address is required',
            city: 'City is required',
            state: 'State is required',
            country: 'Country is required',
            lat: 'Latitude is not valid',
            lng: 'Longitude is not valid',
            name: 'Name must be less than 50 characters',
            description: 'Description is required',
            price: 'Price per day is required'
            }
        })
      }
      if(name.length >=50){
        res.status(400)
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
              address: 'Street address is required',
              city: 'City is required',
              state: 'State is required',
              country: 'Country is required',
              lat: 'Latitude is not valid',
              lng: 'Longitude is not valid',
              name: 'Name must be less than 50 characters',
              description: 'Description is required',
              price: 'Price per day is required'
              }
          })
      }
    let newSpot = await Spot.create({
        ownerId: owner.id,
        address, city,
        state, country,
        lat, lng,
        name, description,
        price
    })


    if(!newSpot){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
                    }
                })
        }
        res.status(201)
        res.json(newSpot)
});


router.post('/:spotId/images', restoreUser, requireAuth, async(req, res)=>{
    const {url, preview} = req.body;
    let spotIdObj = req.params;
    let doesSpotExist = await Spot.findByPk(spotIdObj.spotId)

    if(!doesSpotExist){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let newImage = await SpotImage.scope("currentSpot").create({
        spotId: spotIdObj.spotId,
        url,
        preview
    })

    res.status(200);
    res.json({
        url: url,
        preview: preview
    })
} )

router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let spots = await Spot.findAll({
        where:{
            ownerId: req.user.id
        }
    })
    res.status(200)
    res.json({Spots: spots})
} )

router.get('/:spotId', async (req, res) => {
    //grab all spots while having access to Reviews, without showing Reveiw data
    let spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
            //grab all reviews
            let reviews = await Review.findAll({
                where: {
                    spotId: spot.id
                }
                    })
            //grab all spot images
            let spotImages = await spot.getSpotImages()
            //jump through hoops to get the correct owner info
            let ownerObj = await User.scope("public").findByPk(spot.ownerId)
            let owner = {}
            owner.id = ownerObj.id;
            owner.firstName = ownerObj.firstName;
            owner.lastName = ownerObj.lastName

            //itterate through review to add all the star reviews
            let reviewSum = 0;
            for (let review of reviews){
                reviewSum += review.stars
            }
            let numReviews = reviews.length;
            let reviewAverage = reviewSum / reviews.length;
            //set the data into each spot
            if(!numReviews){
                numReviews = 0
            }
            spot.setDataValue('numReviews', numReviews)
            if(reviewAverage) spot.setDataValue('avgRating', reviewAverage);
            if(spotImages) spot.setDataValue('SpotImages', spotImages);
            if(owner) spot.setDataValue('Owner', owner);

    return res.json(spot)
    });

    router.put('/:spotId', restoreUser, requireAuth, async(req, res)=>{
        const {
            address, city,
            state, country,
            lat, lng,
            name, description,
            price
        } = req.body;

        let spotDataObj = await Spot.findByPk(req.params.spotId)
        if(!spotDataObj){
            res.status(404)
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        let spotObjString = JSON.stringify(spotDataObj)
        let spot = JSON.parse(spotObjString)
        let userDataObj = await spotDataObj.getUser()
        let userObjString = JSON.stringify(userDataObj)
        let owner = JSON.parse(userObjString)
        if(owner.id!== spot.ownerId){
            res.status(401)
            return res.json({
                message: 'Authorization Error',
                statusCode: 401,
                 message: 'Must be the owner to edit a spot'
                    })
        }
        if(!address||!city||!state||!country||!lat||!lng||!name||!description||!price){
            res.status(400)
            return res.json ({
              message: "Validation error",
              statusCode: 400,
              errors: {
                address: 'Street address is required',
                city: 'City is required',
                state: 'State is required',
                country: 'Country is required',
                lat: 'Latitude is not valid',
                lng: 'Longitude is not valid',
                name: 'Name must be less than 50 characters',
                description: 'Description is required',
                price: 'Price per day is required'
                }
            })
          }
        spotDataObj.set({
            ownerId: owner.id,
            address, city,
            state, country,
            lat, lng,
            name, description,
            price
        })

        res.json(spotDataObj)
    })

    router.post('/:spotId/reviews', restoreUser, requireAuth, async(req, res)=>{
        let doesSpotExist = await Spot.findByPk(req.params.spotId)
    if(!doesSpotExist){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
        const {review, stars} = req.body;
        let userDataObj = req.user
        let userObjString = JSON.stringify(userDataObj)
        let user = JSON.parse(userObjString)
        let spotDataObj = await Spot.findByPk(req.params.spotId)
        if(!spotDataObj){
            res.status(404)
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        let spotObjString = JSON.stringify(spotDataObj)
        let spot = JSON.parse(spotObjString)
        let hasBeenReviewed = await Review.findAll({where:{
            userId: user.id,
            spotId: spot.id
        }
        })
        if(hasBeenReviewed.length !== 0){
            res.status(401)
            return res.json({
                message: "User already has a review for this spot",
                statusCode: 403
                    })
        }

        if(!review||stars < 1||stars > 5||!stars){
            res.status(400)
            return res.json({
              message: "Validation error",
              statusCode: 400,
              errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
                }
            })
          }
        let newReview = await Review.create({
            userId: user.id,
            spotId: spot.id,
            review,
            stars
        })

        res.status(200)
        res.json({
            id: newReview.id,
            userId: newReview.userId,
            spotId: newReview.spotId,
            review: review,
            stars: stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt
        })
    })


    router.get('/:spotId/reviews', restoreUser, requireAuth, async(req, res)=>{
        let spotIdObj = req.params;
        let doesSpotExist = await Spot.findByPk(spotIdObj.spotId)

        if(!doesSpotExist){
            res.status(404)
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        let Reviews = await Review.findAll({where:{spotId: req.params.spotId}});

        for(let reviewDataObj of Reviews){
            let reviewDataString = JSON.stringify(reviewDataObj)
            let review = JSON.parse(reviewDataString)

            let userDataObj = await User.findByPk(review.userId)
            let userObjString = JSON.stringify(userDataObj)
            let user = JSON.parse(userObjString)
            let userNoUsername = {}
            userNoUsername.id = user.id;
            userNoUsername.firstName = user.firstName;
            userNoUsername.lastName = user.lastName;

            reviewDataObj.setDataValue('User', userNoUsername)

            let reviewImgsDataObj = await ReviewImage.findAll({
                attributes:['id', 'url'],
                where: {id: review.id}
            })
            if(reviewImgsDataObj.length !== 0){
            reviewDataObj.setDataValue('ReviewImages', reviewImgsDataObj)
            }
    }
    res.status(200);
    res.json({
        Reviews
    })
})

router.delete('/:spotId', restoreUser, requireAuth, async(req, res)=>{
    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let spotStringObj = JSON.stringify(spot);
    let spotReadable = JSON.parse(spotStringObj)
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    if(spotReadable.ownerId !== user.id){
        res.status(403)
        return res.json({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    await spot.destroy();
    res.status(200)
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

router.post('/:spotId/bookings', restoreUser, requireAuth, async(req, res)=>{
    const {startDate, endDate} = req.body;
    const starting = new Date(startDate);
    const ending = new Date(endDate)
    const userId = req.user.id

    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if(userId=== spot.ownerId){
        res.status(400)
        return res.json({
            message: "The owner can not book",
            statusCode: 400
        })
    }
    if(ending <= starting){
        res.status(400)
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    let hasBookingConflict = await Booking.findAll({where:{
        startDate:{
            [Op.between]: [starting, ending]
        },
        endDate: {
            [Op.between]: [starting, ending]
        }
    }})

    if(hasBookingConflict.length > 0){
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }


    let newBooking = await Booking.create({
        spotId: spot.id,
        userId,
        startDate: starting,
        endDate: ending
    })
    return res.json(newBooking)
})

router.get('/:spotId/bookings', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    let userNoUsername = {}
        userNoUsername.id = user.id;
        userNoUsername.firstName = user.firstName;
        userNoUsername.lastName = user.lastName;


    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let spotStringObj = JSON.stringify(spot);
    let spotReadable = JSON.parse(spotStringObj)


    let Bookings= await Booking.findAll({where:{spotId: spotReadable.id}})
    if(user.id === spotReadable.ownerId){
    for(let bookingDataObj of Bookings){
        let bookingDataString = JSON.stringify(bookingDataObj)
        let booking = JSON.parse(bookingDataString)
        let guest = await User.findAll({where:{id: booking.userId}})

        bookingDataObj.setDataValue('User', guest)
}
    }

res.status(200)
res.json({
    Bookings
})
})


module.exports = router;
