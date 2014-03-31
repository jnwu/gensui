var path = require('path')
	, express = require('express')
	, app = require ('../app')
	, cors = require('cors');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/../app/views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../public')));