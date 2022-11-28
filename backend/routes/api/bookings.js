const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();


router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    // let userNoUsername = {}
    //     userNoUsername.id = user.id;
    //     userNoUsername.firstName = user.firstName;
    //     userNoUsername.lastName = user.lastName;

    let Bookings= await Booking.findAll({where:{userId: user.id}})
    for(let bookingDataObj of Bookings){
        let bookingDataString = JSON.stringify(bookingDataObj)
        let booking = JSON.parse(bookingDataString)
        let spot = await Spot.findAll({where:{id: booking.spotId}})

        bookingDataObj.setDataValue('Spot', spot)
}
res.status(200).send({
    Bookings
})
})

router.put('/:bookingId', restoreUser, requireAuth, async(req, res)=>{
    const{startDate, endDate} = req.body
    console.log(startDate)
    console.log(endDate)
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)

    let bookingDataObj = await Booking.findByPk(req.params.bookingId)
    if(!bookingDataObj){
        return res.status(404).send({
            message: "Booking could not be found",
            statusCode: 404
        })
    }
    let bookingObjString = JSON.stringify(bookingDataObj)
    let bookingObj = JSON.parse(bookingObjString)

    if(user.id !== bookingObj.userId){
        return res.status(403).send({
            message: "Only the booking owner can edit their rental",
            statusCode: 403
        })
    }

    if(endDate < startDate){
        return res.status(400).send({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }


    bookingDataObj.set({
        startDate,
        endDate
    })
    console.log(bookingDataObj)
    return res.json(bookingDataObj)
})

router.delete('/:bookingId', restoreUser, requireAuth, async(req, res)=>{
    let booking = await Booking.findByPk(req.params.bookingId);
    if(!booking){
        return res.status(404).send({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    let bookingStringObj = JSON.stringify(booking);
    let bookingReadable = JSON.parse(bookingStringObj)
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)
    if(bookingReadable.userId !== user.id){
        return res.status(403).send({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    await booking.destroy();
    return res.status(200).send({
        message: "Successfully deleted",
        statusCode: 200
    })
})



module.exports = router;
