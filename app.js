// app.js トイレ空いてるよサーバ

(function () {
  'use strict';

  console.log();

  var VERSION = 'v0.0.0';
  var MAX_MESSAGES = 4;
  var PORT = process.env.PORT || 3000;
  var currTime = Date.now(); // or new Date().getTime();

  var DateTime = require('date-time-string');
  var toTimeString = DateTime.toTimeString;
  var toDateTimeString = DateTime.toDateTimeString;

  console.log(delta() + 'starting... port ' + PORT);
  var http = require('http');
  var path = require('path');
  var express = require('express');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var ControlC = require('control-c');

  console.log(delta() + 'require end...');

  var data = require('./data/data');
  var users = {};
  data.users.forEach(function (user) {
    users[user.user_id] = user;
  });
  var groups = {};
  data.groups.forEach(function (group) {
    groups[group.group_id] = group;
  });
  var group_id = data.groups[0].group_id;
  console.log(delta() + 'data load end...');

  function pad(n, m) {
    return m > 0 ? ('            '+ n).slice(-m) : (n + '            ').slice(0, -m);
  }
  function ms(ms) {
    return pad((ms / 1000).toFixed(3), 12) + ' sec '; }
  function delta() {
    var prev = currTime; currTime = Date.now();
    return toTimeString() + ms(currTime - prev); }

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  var server = http.Server(app);
  var io = require('socket.io')(server);
  server.listen(PORT, function () {
    console.log(delta() + 'listening started...');
  });
  console.log(delta() + 'listening starting...');

  app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Cahche-Control', 'private, no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.render('index', {
        title: 'トイレ空いてるよ',
        version: VERSION, 
        max_messages: MAX_MESSAGES,
        group: groups[group_id]});
    // res.sendFile(__dirname + '/public/index.html');
    //res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    //var str = function () {/**/}.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    //res.end(str.replace("'VERSION'", JSON.stringify(VERSION))
    //           .replace("'MAX_MESSAGES'", JSON.stringify(MAX_MESSAGES)));
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  // module.exports = app;

  // 接続カウント
  var connCount = 0;

  // 接続時
  io.on('connection', function (socket) {
    ++connCount; // 接続カウントアップ

    // 放送を送信
    io.emit('broadcast', {conn_count: connCount, version: VERSION, msg: 'new user connected'}); // 全体向け

    // 最初のデータを送信
    socket.emit('first', {conn_count: connCount});

    // 他のイベントを受信
    socket.on('get group', function (data) {
      console.log(delta() + 'get group:' + JSON.stringify(data));
      socket.emit('response group', {conn_count: connCount, group: groups[data.group_id]});
    });

    // 切断時(切断を受信)
    socket.on('disconnect', function () {
      --connCount; // 接続カウントダウン

      console.log(delta() + 'disconnect:');
      // ユーザー切断を送信
      io.emit('user disconnected', {conn_count: connCount, msg: 'user disconnected'});
      setTimeout(function () {
        io.emit('broadcast', {conn_count: connCount});
      }, 100);
    });
  });

  function shutdown() {
    io.emit('broadcast', {conn_count: 0, msg: 'server down'}); // 全体向け
    server.close(); // 新規接続をしない
    setTimeout(process.exit, 200);
  }

  process.on('SIGHUP', function () {
    console.log(delta() + 'SIGHUP exiting...');
    shutdown();
  });

  process.on('exit', function () {
    console.log(delta() + 'exited...');
  });

  var roomsCount = 0;
  for (var i in groups[group_id].sites)
    for (var j in groups[group_id].sites[i].locations)
      for (var k in groups[group_id].sites[i].locations[j].rooms) {
        ++roomsCount;
        groups[group_id].sites[i].locations[j].rooms[k].updated_at = toDateTimeString().slice(0, 19);
      }
    console.log(delta() + 'rooms count... ' + roomsCount);

  var timer = setInterval(function () {
    var n = roomsCount;
    var m = (Math.random() * n) | 0;
    //console.log(delta() + 'interval...', n, m);
    for (var i in groups[group_id].sites) {
      var site = groups[group_id].sites[i];
      for (var j in site.locations) {
        var loc = site.locations[j];
        for (var k in loc.rooms) {
          var room = loc.rooms[k];
          if (--n === m) {
            room.status = 1;
            room.updated_at = toDateTimeString().slice(0, 19);
            var obj = {group_id: group_id,
                site_id: site.site_id,
                location_id: loc.location_id,
                room_id: room.room_id,
                status: room.status,
                updated_at: room.updated_at };
            io.emit('room changed', obj);
            setTimeout(function (room, obj) {
              room.status = obj.status = 0;
              room.updated_at = obj.updated_at = toDateTimeString().slice(0, 19);
              io.emit('room changed', obj);
            }, 7500, room, obj);
            break;
          }
        }
      }
    }
  }, 2000);

  ControlC(
    function () {
      console.log(delta() + 'control-c...');
      io.emit('broadcast', {conn_count: connCount, msg: 'control-c'});
    },
    function () {
      console.log(delta() + 'control-c twice... shutdown...');
      shutdown();
      clearInterval(timer);
    },
    function () {
      console.log(delta() + 'control-c too many... ignore...');
    }
  );

})();
