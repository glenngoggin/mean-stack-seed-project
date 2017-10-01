var mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
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


AuthorSchema.statics = {
  listAuthors(skip = 0, limit = 50) {
    return this.find({})
      .sort({ _id: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  getAuthor(id) {
    return this.findById(id)
      .exec();
  },
  createAuthor(author) {
    var authorModel = new this(author);
    return authorModel.save(author);
  },
  updateAuthor(id,author) {
    return this.findByIdAndUpdate(id,author,{new: true});
  },
  deleteAuthor(id) {
    return this.findByIdAndRemove(id);
  },
  deleteAllAuthors() {
    return this.remove({});
  }
};

const AuthorModel = mongoose.model('Author', AuthorSchema);
module.exports = AuthorModel;

