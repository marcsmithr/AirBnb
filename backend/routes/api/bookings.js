const express = require('express');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { json } = require('sequelize');

const router = express.Router();


router.get('/current', restoreUser, requireAuth, async(req, res)=>{
    let userDataObj = req.user
    let userObjString = JSON.stringify(userDataObj)
    let user = JSON.parse(userObjString)


    let Bookings= await Booking.findAll({where:{userId: user.id}})
    for(let bookingDataObj of Bookings){
        let bookingDataString = JSON.stringify(bookingDataObj)
        let booking = JSON.parse(bookingDataString)
        let spotDataObj = await Spot.findAll({where:{id: booking.spotId}})
        let spotString = JSON.stringify(spotDataObj)
        let spotObj = JSON.parse(spotString)
        let previewImage = await SpotImage.findAll({
            where: {
                spotId: booking.spotId,
                preview: true
                }
            })
        let previewImageString = JSON.stringify(previewImage)
        let previewImageObj = JSON.parse(previewImageString)
        //grab url from previewImage
        let url;
        if(previewImageObj[0]){
            url = previewImageObj[0].url
        }
        let ownerObj = await User.scope("public").findByPk(spotObj[0].ownerId)
        let owner = {}
        owner.id = ownerObj.id;
        owner.firstName = ownerObj.firstName;
        bookingDataObj.setDataValue('Owner', owner)
        bookingDataObj.setDataValue('spot', spotObj[0])
        bookingDataObj.setDataValue('previewImage', url)
}
res.status(200)
return res.json({
    Bookings
})
})

router.put('/:bookingId', restoreUser, requireAuth, async(req, res)=>{
    const{startDate, endDate} = req.body
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
        res.status(403)
        return res.json({
            message: "Only the booking owner can edit their rental",
            statusCode: 403
        })
    }

    if(endDate < startDate){
        res.status(400)
        return res.json({
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
        res.status(404)
        return res.json({
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
        res.status(403)
        return res.json({
            message: "Must be the owner to delete",
            statusCode: 403
        })
    }
    let now = new Date().getTime()
    let startDate = new Date(bookingReadable.startDate).getTime()
    if(now >= startDate){
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }
    await booking.destroy();
    res.status(200)
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})



module.exports = router;
