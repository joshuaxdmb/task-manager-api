const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const maintenanceMode = false;

const app = express();

const multer = require('multer');
const upload = multer({
    dest: 'images'
})

app.post('/upload',upload.single('upload'), (req,res)=>{
    res.send();
})

app.use((req,res,next)=>{
    if(maintenanceMode){res.status(503).send('We are making things better. Thank you for your patience.')}
    else{next();}
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


module.exports = app
