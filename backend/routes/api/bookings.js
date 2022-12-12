const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();


router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)

    let Bookings= await Booking.findAll({where:{userId: user.id}})
    for(let bookingDataObj of Bookings){
        let bookingDataString = JSON.stringify(bookingDataObj)
        let booking = JSON.parse(bookingDataString)
        let spot = await Spot.findAll({where:{id: booking.spotId}})

        bookingDataObj.setDataValue('Spot', spot)
}
res.status(200)
return res.json({
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
        res.status(404)
        return res.json({
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
    await bookingDataObj.save()
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
    let now = new Date().getTime()
    console.log(now)
    let startDate = new Date(bookingReadable.startDate).getTime()
    console.log(startDate)
    if(now >= startDate){
        return res.status(403).send({
            message: "Bookings that have been started can't be deleted",
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
