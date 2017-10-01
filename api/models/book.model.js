var mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index:true
  },
  description: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  ],
  is_live:{
    type: Boolean,
    default:true
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

BookSchema.statics = {
  listBooks(skip = 0, limit = 50) {
    return this.find({ is_live: true })
      .sort({ _id: -1 })
      .skip(+skip)
      .limit(+limit)
      .populate('authors')
      .exec();
  },
  getBook(id) {
    return this.findById(id).populate('authors')
      .exec();
  },
  createBook(book) {
    var bookModel = new this(book);
    return bookModel.save(book);
  },
  updateBook(id,book) {
    return this.findByIdAndUpdate(id,book,{new: true});
  },
  deleteBook(id) {
    return this.findByIdAndRemove(id);
  },
  deleteAllBooks() {
    return this.remove({});
  }
};

const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;

