// ltsv-example.js LTSVサンプル

'use strict';

function toLtsv(obj) {
  obj = obj || this || {};
  if (obj instanceof Array)
    return obj.map(toLtsv).join('');

  var arr = [];
  for (var k in obj) arr.push(k + ':' + obj[k]);
  return arr.join('\t') + '\n';
}
//if (!Object.prototype.toLtsv)
//  Object.defineProperty(Object.prototype, 'toLtsv',
//    {value: toLtsv, writable: true, configurable: true});

var g = Function('return this');
function Hash() {
  var obj = (!this || this === g) ? {} : this;
  for (var i = 0, n = arguments.length; i < n; ++i)
    obj[arguments[i][0]] = arguments[i][1];
  return obj;
}

function ltsvToObject(str) {
  return Hash.apply({}, str.split('\t').map(
    function (el) { return el.split(':', 2); }));
}

var arr = [];
readLine(function line(str) {
  var obj = ltsvToObject(str);
  console.log(obj);
  console.log(toLtsv(obj).trim());
  arr.push(obj);
}, function end() {
  console.log();
  console.log(toLtsv(arr));
});

function readLine(lineFunc, endFunc) {
  var buffs = [];
  var r = process.stdin;
  r.on('readable', function () {
    var buff = r.read();
    if (!buff) return;
    buffs.push(buff);
    var pos = buff.toString('ascii').indexOf('\n');
    while (pos >= 0) {
      buffs = [buff = Buffer.concat(buffs)];
      pos = buff.toString('ascii').indexOf('\n');
      if (pos === 0) {
        buffs = [buff.slice(1)];
        console.log('0x0a!');
      }
      else if (pos > 0) {
        buffs = [buff.slice(pos + 1)];
        if (buff[pos - 1] === 0x0d) --pos;
        str = buff.toString('utf8', 0, pos);
        lineFunc(str);
      }
      buff = buffs[0];
      pos = buff.toString('ascii').indexOf('\n');
    }
  });
  r.on('end', endFunc);
}
