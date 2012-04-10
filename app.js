
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , email   = require('mailer');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.post('/email', function( req,res ) {

  email.send({
    host : "intranet.teknotelecom.com",
    port : "25",
    domain : "teknotelecom.com",
    to : "jgosnell@teknotelecom.com",
    from : "jgosnell@teknotelecom.com",
    subject : "This is a subject",
    body: "Hello, this is a test body",
    authentication : "login",
    username : req.body.username,
    password : req.body.password
  },
  function(err){
    if(err){
      console.log(err);
    }
  });

  res.send( "Got something" );

});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
