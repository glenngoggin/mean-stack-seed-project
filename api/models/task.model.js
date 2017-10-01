var mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    index:true
  },
  status:{
    type: String,
    default:'in_queue'
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});


TaskSchema.statics = {
  listTasks(skip = 0, limit = 50) {
    return this.find({})
      .sort({ _id: -1 })
      .skip(+skip)
      .limit(+limit)
      .populate('users')
      .exec();
  },
  getTask(id) {
    return this.findById(id).populate('users').exec();
     
  },
  createTask(task) {
    var taskModel = new this(task);
    return taskModel.save(task);
  },
  updateTask(id,task) {
    return this.findByIdAndUpdate(id,task,{new: true});
  },
  deleteTask(id) {
    return this.findByIdAndRemove(id);
  },
  deleteAllTasks() {
    return this.remove({});
  }
};

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;

