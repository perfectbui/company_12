process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
const server = app.listen(port);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');
const fs = require('fs');
app.use(morgan('dev'));

const path = require('path');
const cookieParser = require('cookie-parser');
const io = require('socket.io').listen(server, {
	cookie: false,
});

try {
	fs.mkdirSync(path.join(__dirname, '/public/uploads/imgs'));
} catch (err) {
	if (err.code !== 'EXIST') {
		console.log('Error khi tao directory : ', err);
	}
}

mongoose
	.connect(process.env.MongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {})
	.catch((err) => console.log(err));

app.use(compression());
app.use(cors());
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: true,
		saveUninitialized: false,
	})
);

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
