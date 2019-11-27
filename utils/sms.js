const accountSid = process.env.SMS_SID
const authToken =  process.env.SMS_TOKEN
const phone = process.env.SMS_PHONE

const client = require('twilio')(accountSid,authToken)
const sendsms = (mobile,smsOptions) => {
    console.log(mobile);
    client.messages.create({
        body: smsOptions,
        from: phone,
        to: mobile
    }).then(message=>console.log(message.sid))
}

module.exports = sendsms