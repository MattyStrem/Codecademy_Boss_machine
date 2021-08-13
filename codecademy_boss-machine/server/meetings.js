const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
    createMeeting,
} = require('./db');

//get all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

//post new meeting
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
}); 

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})