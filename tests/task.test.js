const request = require('supertest');
const User = require('../src/models/user')
const Task = require('../src/models/task')
const app = require('../src/app')
const { setupDatabase, 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo, 
    taskOne, 
    taskTwo, 
    taskThree} = require('./fixtures/db')


beforeEach(setupDatabase);

test('Should create a task for user', async() => {

    response = await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From my test'
    })
    .expect(201)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);

})

test('Should get tasks for userOne', async()=>{
    response = await request(app)
    .get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users tasks', async() =>{
    response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();

})