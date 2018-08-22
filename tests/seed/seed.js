const {ObjectID} = require('mongodb');
const {User} = require('./../../models/user');

const users = [{
  email : 'sponge@bob.com',
  password : 'garyTheSnail'
},{
  email: 'UgurTwo@example.com',
  password: 'user2password'
}];

const populateUsers = async ()=>{
  await User.remove({})
  var userOne = await new User(users[0]).save();
  var userTwo = await new User(users[1]).save();
}


module.exports = {
  users,
  populateUsers
};
