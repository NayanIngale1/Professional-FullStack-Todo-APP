const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(
    "mongodb+srv://nayan:nayan123@todo-database.bhlmr.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;
