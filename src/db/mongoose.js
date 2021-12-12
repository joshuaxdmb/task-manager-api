
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    autoIndex:true
})



/* const me = new User({
    name: 'Joshua',
    age: 24,
    email: 'joshuaxdmb@gmail.com',
    password:'pass234590'
})

me.save().then(()=>{
    console.log(me);
}).catch((error)=>{
    console.log('Error',error);
}) */

