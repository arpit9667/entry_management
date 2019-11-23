const mongoose = require('mongoose')
const validator = require('validator')

const Dets = mongoose.Schema({
    visitor:{
        type:String,
        required:true,
        trim: true,
    },
    hphone:{
        type: String,
        required: true,
        minlength: 10,
        validate(value){
            if(!validator.isMobilePhone(value))
                throw new Error('Mobile is invalid!!')
        }
    },
    vphone:{
        type: String,
        required: true,
        minlength: 10,
        validate(value){
            if(!validator.isMobilePhone(value))
                throw new Error('Mobile is invalid!!')
        }
    },
    host:{
        type: String,
        required: true,
        trim: true
    },
    hmail:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is invalid!!')
        
        },
        trim:true,
        lowercase:true
    },
    vmail:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is invalid!!')
        
        },
        trim:true,
        lowercase:true
    },
    checkin:{
        type: Date,
        default:Date.now
    },
    checkout:{
        type:Date,
        default:null
    }
})

const details = mongoose.model('details', Dets);

module.exports = details