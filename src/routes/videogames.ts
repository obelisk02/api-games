import express from 'express';
import controller from '../controllers/videogames';

const router = express.Router();

router
    .get('/videogames', controller.getAll)
    .get('/videogames/:id', controller.get)
    .post('/videogames', controller.create)
    .patch('/videogames/:id', controller.update)
    .delete('/videogames/:id', controller.remove)


export = router;
