var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/db');

var indexRouter = require('./routes/index');

var adminRouter = require('./routes/admin/adminRouter');
var agentRouter = require('./routes/agent/agentRouter');
var authRouter = require('./routes/auth/authRouter');
var profRouter = require('./routes/professor/profRouter');
var histRouter = require('./routes/professor/histRouter');
var demandeRouter = require('./routes/demande/quitterTerritoire');
var demandeAttestationTravail = require('./routes/demande/attestationTravail');
var demandeCongeRouter = require('./routes/demande/conge');
var demandeOrdreMission = require('./routes/demande/ordreMission');
var profDemandeRouter = require('./routes/demande/demandes');
var notifRouter = require('./routes/notifications/notification');
var fileRouter = require('./routes/file/fileRouter');
var app = express();

// Connect to the database when the app starts
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Enable CORS middleware production
app.use(cors(
  {
    origin: ["https://human-resource-management-frontend.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}
));

// Enable CORS middleware developement
// app.use(cors())
app.use("/files", express.static("files"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/admin', adminRouter);
app.use('/agent', agentRouter);
app.use('/auth', authRouter);
app.use('/prof', profRouter);
app.use('/hist', histRouter);
app.use('/demande', demandeRouter)
app.use('/demandeConge', demandeCongeRouter)
app.use('/demandeAttestationTravail', demandeAttestationTravail)
app.use('/demandeOrdreMission', demandeOrdreMission)
app.use('/demandes', profDemandeRouter)
app.use('/notifs', notifRouter)
app.use('/FilesManagement', fileRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const PORT = 4000;
app.listen(PORT, ()=> console.log(`app is up and running on port : ${PORT}`));
module.exports = app;
