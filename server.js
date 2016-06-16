const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost/data/db/elote');

const User = mongoose.model('user', mongoose.Schema({
	name: String,
	mail: String,
	alias: String,
	stories: Array
}));

function file(filename, alfredo){
	fs.readFile(filename, function(err, data){
		if(err)
			console.error(err);
		alfredo(data);
	});
};

module.exports = app;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
	secret: '08DA22SDF245GVEWU7I74GA23',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: true
	}
}));

app.get('/', function(req, res, next){
	let sess = req.session;
	if(sess.email){
		next();
	}
	res.setHeader('Content-Type', 'text/html');
	file('index.html', function(data){
		if(data)
			res.status(200).send(data.toString('utf-8'));
	});
});

app.get('/', function(req, res){
	if(!req.session.email){
		return res.status(404).send('ERROR! No subiste ninguna historia');
	}
	User.find(function(err, elotes){
		if(err)
			res.end(err);
		res.status(200).jsonp(elotes);
	});
});

app.get('/views/:f', function(req, res){
	file('views/' + req.params.f, function(data){
		if(!data)
			return res.status(404).send('I cannot find it!');
		if(path.extname(req.params.f) === '.css')
			res.setHeader('Content-Type', 'text/css');
		else if(path.extname(req.params.f) === '.js')
			res.setHeader('Content-Type', 'text/javascript');
		res.status(200).send(data.toString('utf-8'));
	});
});

app.get('/login', function(req, res, next){
	let sess = req.session;
	if(sess.email)
		res.redirect('/');
	usr = res.body;
	elote = new User({
		name: usr.name,
		alias: usr.alias,
		mail: usr.mail,
		stories: [{
			title: usr.title,
			body: usr.body,
			datetime: usr.datetime
		}]
	});
	elote.save(function(err, elote){
		if(err)
			return res.status(500).send(err.message);
		req.session.email = elote.mail;
		req.session.name = elote.name;
		res.status(200).jsonp(elote);
	});
});

app.get('/story/:id', function(req, res){
	let id = req.params.id;
	User.findById(id, function(err, elote){
		if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(elote);
	});
});