const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Joshua',
    email: 'joshua1@example.com',
    password: '1234Abcd!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Joshua2',
    email: 'joshua2@example.com',
    password: '1234Abcd!2',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const taskOneId = new mongoose.Types.ObjectId()
const taskOne = {
    _id: taskOneId,
    description: 'First Task',
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    owner: userTwoId
}




const setupDatabase = async() =>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}