const express = require('express');
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models');
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

    if(!address||!city||state||!country||!lat||!lng||!name||!description||!price){
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







module.exports = router;
