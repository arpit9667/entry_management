const express = require('express')
const router = new express.Router()
const details = require('./model')
const sendmail = require('./mail')
const sendsms = require('./sms')


router.post('/checkin', async (req,res)=>{
    const detail = new details({
        ...req.body
    });
    try{
        await detail.save();
        sendmail({
            from:"isdgrp9@gmail.com",
            to:detail.hmail,
            subject:"CheckIn by "+ detail.visitor,
            text:"Name: " + detail.visitor+"\nEmail: " + detail.vmail +"\nPhone: "+detail.vphone
        });
        sendsms(detail.hphone, "Name: " + detail.visitor+"\nEmail: " + detail.vmail +"\nPhone: "+detail.vphone);
        res.status(201).send(detail);
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

router.post('/checkout/:id',async (req,res)=>{
    const id = req.params.id
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
        res.status(201).send(detail);
    }
    catch(e){
        res.status(400).send(e);
    }
    
})

module.exports = router