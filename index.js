const fs = require('fs')
const exec = require('child_process').exec;
const async = require('async');

const files = fs.readdirSync('./src').filter(item => item.endsWith('.spec.js'));
const funcs = files.map(file => {
  return exec.bind(null, `node --require ./setup-globals.js ./**/${file}`);
});

async.parallel(funcs, (err, data) => {
  if (err) {
    return console.log(err);
  }

  data.forEach((lines, index) => {
    console.log('\x1b[2m\033[1m', `${files[index]}`, '\x1b[0m', '\n');

    lines.forEach(line => {
      console.log(line);
    });
  });
});
