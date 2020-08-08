const robohashAvatars = require('robohash-avatars');
const fs = require('fs').promises;
const path = require('path');
const rootPath = __dirname;

const avaPath = path.join(rootPath, '../tmp/randomCat.png');

const createRandomAvatar = async (req, res, next) => {
  const avatarURL = robohashAvatars.generateAvatar({
    username: 'tonystark',
    background: robohashAvatars.BackgroundSets.RandomBackground1,
    characters: robohashAvatars.CharacterSets.Robots,
    height: 400,
    width: 400,
  });

  console.log(avatarURL);

  await fs.writeFile(avaPath, avatarURL);

  next();
};

module.exports = createRandomAvatar;
