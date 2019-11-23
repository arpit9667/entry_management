const accountSid = "AC91a567af69b4eaf100e3f121c7f8fedf"
const authToken =  "864d4bc2004ad429b2dd677b23fe04f0"
const phone = "+12056513884"

const client = require('twilio')(accountSid,authToken)
const sendsms = (mobile,smsOptions) => {
    client.messages.create({
        body: smsOptions,
        from: phone,
        to: mobile
    }).then(message=>console.log(message.sid))
}

module.exports = sendsms