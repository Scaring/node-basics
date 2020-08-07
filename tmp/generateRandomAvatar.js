const Avatar = require('avatar-builder');
const fs = require('fs');
const root = __dirname;

const avatar = Avatar.catBuilder(128);

const createRandomAvatar = (req, res) => {
  const avatarName = Date.now();
  avatar
    .create('gabriel')
    .then(buffer => fs.writeFileSync(`${root}/${avatarName}.png`, buffer))
    .then(() => (req.avatarUrl = `${avatarName}.png`));
};

module.exports = createRandomAvatar;
