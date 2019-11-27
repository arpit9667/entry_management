const express = require('express')
const router = new express.Router()
const details = require('./model')
const sendmail = require('./mail')
const sendsms = require('./sms')
const path = require('path')
const bodyParser = require('body-parser')

router.get('/checkin', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/checkin.html'))
})

router.post('/checkin', /*bodyParser.urlencoded({ extended: false }) ,*/async (req,res)=>{
    const detail = new details({
        ...req.body
    });
    // console.log(req.body);
    try{
        await detail.save();
        await sendmail({
            from:"isdgrp9@gmail.com",
            to:detail.hmail,
            subject:"CheckIn by "+ detail.visitor,
            text:"Name: " + detail.visitor+"\nEmail: " + detail.vmail +"\nPhone: "+detail.vphone
        });
        // console.log(detail.hphone);
        await sendsms(detail.hphone, "Name: " + detail.visitor+"\nEmail: " + detail.vmail +"\nPhone: "+detail.vphone);
        res.sendFile(path.join(__dirname,'../frontend/thankyou.html'));
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.get('/getCurrent',async ( req,res)=>{
    const all = []
    const detail = await details.find({})
    detail.forEach((det)=>{
        if(det.checkout == null){
            all.push(det)
        }
    })
    res.status(200).send(all);
})

router.get('/displayCurrent', async(req,res) => {
    res.status(200).sendFile(path.join(__dirname,'../frontend/display.html'))
})
router.post('/checkout',async (req,res)=>{
    const id = req.body.id
    const detail = await details.findById({_id:id});
    detail.checkout = Date.now();
    try{
        await detail.save();
        sendmail({
            from:"isdgrp9@gmail.com",
            to:detail.vmail,
            subject:"CheckOut by "+ detail.visitor,
            text:"Name: " + detail.visitor+"\nPhone: " + detail.vphone +"\nCHECKIN: "+detail.checkin +"\nCHECKOUT: "+detail.checkout+"\nHost: "+detail.host+ "\nAddress: Jaipur"
        });
        sendsms(detail.hphone, "Name: " + detail.visitor+"\nPhone: " + detail.vphone +"\nCHECKIN: "+detail.checkin +"\nCHECKOUT: "+detail.checkout+"\nHost: "+detail.host+ "\nAddress: Jaipur");
        res.status(200).sendFile(path.join(__dirname,'../frontend/thankyou.html'));
    }
    catch(e){
        res.status(400).send(e);
    }
    
})

router.get('/*', async ( req,res) => {
    res.sendFile(path.join(__dirname,'../frontend/404.html'))
})
module.exports = router