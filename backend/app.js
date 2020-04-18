// Require Modules
import express from 'express';

// Middleware
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// Routes
import restaurant from './routes/restaurant';
import reservation from './routes/reservation';
import table from './routes/table';
import user from './routes/user';
import reviews from './routes/reviews';
import menu from './routes/menu';

import * as specs from './swagger';

const swaggerUi = require('swagger-ui-express');

// Initialise express and apply middleware
const app = express();
app.use(helmet()); // Security helper plugin that removes or changes certain headers
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(morgan('dev')); // for logging

// Inject all routes
app.use('/restaurant', restaurant);
app.use('/reservation', reservation);
app.use('/table', table);
app.use('/user', user);
app.use('/reviews', reviews);
app.use('/menu', menu);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));

export default app;
