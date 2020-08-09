const Avatar = require('avatar-builder');
const { createCanvas } = require('canvas');
const fs = require('fs').promises;
const path = require('path');
const rootPath = __dirname;

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const createRandomAvatar = async (req, res, next) => {
  const avaName = `${Date.now()}.png`;
  const avaPath = path.join(rootPath, `../tmp/${avaName}`);
  const avaParam1 = getRandomInt(4);
  const avaParam2 = getRandomInt(4);

  const catAvatar = Avatar.catBuilder(256);

  await catAvatar
    .create(`sample${avaParam1}-${avaParam2}`)
    .then(buffer => fs.writeFile(avaPath, buffer));

  req.avaPath = avaPath;
  req.avaName = avaName;
  next();
};

module.exports = createRandomAvatar;
