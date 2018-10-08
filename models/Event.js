var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var EventSchema = mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  product: String,
  subject: String,
  place: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

var Event = mongoose.model("Event", EventSchema);
module.exports = Event;
