const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'joshuaxdmb@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the S-inventory app, ${name}. Let me know how you get along with the app.`

})
}

const sendCancellationEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from: 'joshuaxdmb@gmail.com',
        subject: 'All the best',
        text: `Goodbye ${name}, we are sorry to see you go. Is there anything we could have done to keep you?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}