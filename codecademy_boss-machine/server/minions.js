const minionsRouter = require('express').Router();

module.exports = minionsRouter;


const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next()
    } else {
        res.status(404).send()
    }
});

//MINIONS ROUTES

//get all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

//POST new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

//get minion by Id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//Put update a minion
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

//Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
});

// MINIONS WORK ROUTES
minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next()
    } else {
        res.status(404).send()
    }
});

//get minion work
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((job) => {
        return job.minionId == req.params.minionId;
    });
    res.send(work);
});

//post minion new jobs
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
}); 

//put - updates minion work
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

//delete minions work
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deletedwork = deleteFromDatabasebyId('work', req.params.workId);
    if (deletedwork) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
});