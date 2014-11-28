// app.js トイレ空いてるよサーバ

'use strict';

console.log();

var PORT = 3000;
var currTime = Date.now(); // or new Date().getTime();
var version = 11;

var DateTime = require('date-time-string');
//var toDateTimeString = DateTime.toDateTimeString;
//var toDateString = DateTime.toDateString;
var toTimeString = DateTime.toTimeString;

console.log(delta() + 'starting...');
var http = require('http');
var path = require('path');
var ControlC = require('control-c');
var express = require('express');
console.log(delta() + 'require end...');
var data = require('./data/data');
var users = [];
data.users.forEach(function (user) {
  users[user.user_id] = user;
});
var groups = [];
data.groups.forEach(function (group) {
  groups[group.group_id] = group;
});
var group_id = data.groups[0].group_id;
console.log(delta() + 'data load end...');

// DateTime.extendDateToDateTimeString();
// DateTime.extendDateToString();

function pad(n, m) {
  return m > 0 ? ('          '+ n).slice(-m) : (n + '          ').slice(0, -m);
}
function ms(ms) {
  return pad((ms / 1000).toFixed(3), 10) + ' s';
}
function delta() {
  var prev = currTime;
  currTime = Date.now();
  return toTimeString() + ms(currTime - prev) + ' ';
}

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
server.listen(PORT, function () {
  console.log(delta() + 'listening started...');
});
console.log(delta() + 'listening starting...');

app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/public/index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  var str = function () {/*
<script src="/socket.io/socket.io.js"></script>
<div id="conn-count"></div><br/>
<pre id="container"></pre>
<script>
  var version = 'VERSION';
  var currTime = new Date().getTime();

  var $connCount = document.getElementById('conn-count');
  var $container = document.getElementById('container');
  function pr(msg) {
    var div = document.createElement('div');
    //if (msg.color) div.style.color = msg.color;
    div.appendChild(document.createTextNode(msg));
    $container.appendChild(div);
  }

  var socket = io.connect('http://localhost');
  // 最初の電文を受信
  socket.on('first', function (data) {
    dispCount(data);
    pr('first:' + JSON.stringify(data));
    socket.emit('get group', { group_id: 'rs' });
  });
  // グループを受信
  socket.on('response group', function (data) {
    dispCount(data);
    pr('response group:' + JSON.stringify(data));
    for (var i in data.group.sites)
      for (var j in data.group.sites[i].locations)
        for (var k in data.group.sites[i].locations[j].rooms)
          pr([data.group.name, data.group.sites[i].name,
              data.group.sites[i].locations[j].name,
              data.group.sites[i].locations[j].rooms[k].name].join(' - '));
  });
  // 放送を受信
  socket.on('broadcast', function (data) {
    dispCount(data);
    pr('broadcast:' + JSON.stringify(data));
  });
  // ユーザー切断を受信
  socket.on('user disconnected', function (data) {
    dispCount(data);
    pr('user disconnected:' + JSON.stringify(data));
  });

  function dispCount(data) {
    if (data && data.hasOwnProperty('conn_count')) {
      $connCount.innerHTML = 'オンライン接続数: ' + data.conn_count;
      $connCount.style.color = data.conn_count ? 'green' : 'red';
    }
    if (data && data.hasOwnProperty('version')) {
      if (data.version !== version) {
        //socket.emit('bye', null);
        //socket.close();
        setTimeout(location.reload, 100);
      }
    }
  }
</script>
*/}.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
  res.end(str.replace("'VERSION'", version));
});

// 接続カウント
var connCount = 0;

// 接続時
io.on('connection', function (socket) {
  ++connCount; // 接続カウントアップ

  // 放送を送信
  io.emit('broadcast', {conn_count: connCount, version: version, msg: 'new user connected'}); // 全体向け

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
      io.emit('broadcast', {conn_count: connCount, version: version});
    }, 100);
  });
});

function shutdown() {
  io.emit('broadcast', {conn_count: 0, msg: 'server down'}); // 全体向け
  //io.close();
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

ControlC(
  function () {
    console.log(delta() + 'control-c...');
    io.emit('broadcast', {conn_count: connCount, msg: 'control-c'});
  },
  function () { shutdown(); },
  function () {  }
);
