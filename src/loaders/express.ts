import express from 'express';
import bodyParser from 'body-parser';
import routes from '@api/index';
import cors from 'cors';
import {morganMiddleware, loggerMiddleware} from '@api/middlewares/loggerMiddleware'


export default ({ app }: { app: express.Application }) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use([loggerMiddleware, morganMiddleware ]);
    app.use('/',  routes());

};