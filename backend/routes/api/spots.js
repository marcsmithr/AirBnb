const express = require('express');
const { User, Spot, Review, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

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

router.post('/', restoreUser, requireAuth, async(req, res)=>{
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
        return res.status(400).send({
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
        return res.status(400).send({
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
        return res.status(400).send({
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
        res.status(201).send(newSpot)
});


router.post('/:spotId/images', restoreUser, requireAuth, async(req, res)=>{
    const {url, preview} = req.body;
    let spotIdObj = req.params;
    let doesSpotExist = await Spot.findByPk(spotIdObj.spotId)

    if(!doesSpotExist){
        return res.status(404).send({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let newImage = await SpotImage.scope("currentSpot").create({
        spotId: spotIdObj.spotId,
        url,
        preview
    })

    return res.status(200).send({
        id: newImage.id,
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
    res.json(spots)
} )

router.get('/:spotId', async (req, res) => {
    //grab all spots while having access to Reviews, without showing Reveiw data
    let spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return res.status(404).send({
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
            return res.status(404).send({
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
            return res.status(401).send({
                message: 'Authorization Error',
                statusCode: 401,
                 message: 'Must be the owner to edit a spot'
                    })
        }
        if(!address||!city||!state||!country||!lat||!lng||!name||!description||!price){
            return res.status(400).send({
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

    //COME BACK AND FINISH THIS! Problem: has extra Spot and User ids, review does not have an Id
    router.post('/:spotId/reviews', restoreUser, requireAuth, async(req, res)=>{
        let doesSpotExist = await Spot.findByPk(req.params.spotId)
    if(!doesSpotExist){
        return res.status(404).send({
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
            return res.status(404).send({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        let spotObjString = JSON.stringify(spotDataObj)
        let spot = JSON.parse(spotObjString)
        let hasBeenReviewed = Review.findAll({where:{
            userId: user.id,
            spotId: spot.id
        }
        })
        if(hasBeenReviewed){
            return res.status(401).send({
                message: "User already has a review for this spot",
                statusCode: 403
                    })
        }

        if(!review||stars < 1||stars > 5||!stars){
            return res.status(400).send({
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
        console.log('-------------')
        console.log(user)
        console.log('--------------')
        console.log('-------------')
        console.log(spot)
        console.log('--------------')
        console.log('-------------')
        console.log(newReview)
        console.log('--------------')
        res.status(200).send({
            id: newReview.id,
            userId: newReview.userId,
            spotId: newReview.spotId,
            review: review,
            stars: stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt
        })
    })
    //same issue here
        router.post('/:spotId/bookings', restoreUser, requireAuth, async(req, res)=>{
            // const {startDate, endDate} = req.body;
            // let userDataObj = req.user
            // let userObjString = JSON.stringify(userDataObj)
            // let user = JSON.parse(userObjString)
            // let spotDataObj = await Spot.findByPk(req.params.spotId)
            // if(!spotDataObj){
            //     return res.status(404).send({
            //         message: "Spot couldn't be found",
            //         statusCode: 404
            //     })
            // }
            // let spotObjString = JSON.stringify(spotDataObj)
            // let spot = JSON.parse(spotObjString)
            let newBooking = await Booking.create({
                spotId: 3,
                userId: 1,
                startDate: '2023-11-05',
                endDate: '2023-11-07'
            })
            res.json(newBooking)
        })




module.exports = router;
