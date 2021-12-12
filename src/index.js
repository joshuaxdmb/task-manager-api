const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const maintenanceMode = false;

const port = process.env.PORT;
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


app.listen(port,()=>{
    console.log('Server is up on port',port);
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () =>{
    /* const task = await Task.findById("619f79b11cd0b3dc56913289");
    console.log(task);
    await task.populate('owner');
    console.log(task.owner); */
    const user = await User.findById('619f720b1271b1abd3380ba0');
    await user.populate('tasks');
    console.log(user.tasks);
}

