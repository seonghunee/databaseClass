const path = require('path');
const express = require('express');

const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const notFoundHandlerMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const homeRoutes = require('./routes/home-route');
const authRoutes = require('./routes/auth-route');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

app.use(checkAuthStatusMiddleware);

app.use(homeRoutes);
app.use(authRoutes);

app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(3000);
