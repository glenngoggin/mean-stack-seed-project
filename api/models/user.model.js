var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index:true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});


UserSchema.statics = {
  listUsers(skip = 0, limit = 50) {
    return this.find({})
      .sort({ _id: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  getUser(id) {
    return this.findById(id)
      .exec();
  },
  createUser(user) {
    var userModel = new this(user);
    return userModel.save(user);
  },
  updateUser(id,user) {
    return this.findByIdAndUpdate(id,user,{new: true});
  },
  deleteUser(id) {
    return this.findByIdAndRemove(id);
  },
  deleteAllUsers() {
    return this.remove({});
  }
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;

