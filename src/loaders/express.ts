import express from 'express';
import bodyParser from 'body-parser';
import routes from '@api/index';
import cors from 'cors';
import {morganMiddleware, loggerMiddleware} from '@api/middlewares/loggerMiddleware'
import validateToken from '@api/middlewares/tokenMiddleware'
import getkeys from '@api/middlewares/keysMiddleware';


export default ({ app }: { app: express.Application }) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use([loggerMiddleware, morganMiddleware, validateToken, getkeys]);
    app.use('/',  routes());

};