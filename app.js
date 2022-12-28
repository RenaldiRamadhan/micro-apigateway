require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const mediaRouter = require('./routes/media');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');
const orderPaymentRouter = require('./routes/orderPayment');

const verifyToken = require('./middleware/verifyToken');
const mid = require('./middleware/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/chapters', verifyToken, mid('admin'), chaptersRouter);
app.use('/lessons', verifyToken, mid('admin'), lessonsRouter);
app.use('/media', verifyToken, mid('admin', 'student'), mediaRouter);
app.use('/orders', verifyToken, mid('admin', 'student'), orderPaymentRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, mid('admin'), mentorsRouter);
app.use('/image-courses', mid('admin'), imageCoursesRouter);
app.use('/reviews', verifyToken, mid('admin', 'student'), reviewsRouter);
app.use('/my-courses', verifyToken, mid('admin', 'student'), myCoursesRouter);
app.use('/webhook', webhookRouter);

module.exports = app;

// verify token untuk kalo mau akses halo ada token nya
