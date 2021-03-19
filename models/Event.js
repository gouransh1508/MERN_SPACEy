const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const EventSchema = new Schema({
  EMail: {
    type: String,
    required: true
  },
  EventName: {
    type: String,
    required: true
  },
  EventType: {
    type: String,
    required: true
  },
  EventStart: {
    type: Date,
    default: Date.now,
    required: true
  },
  EventEnd: {
    type: Date,
    default: Date.now,
    required: true
  },
  NoPeople: {
    type: String,
    required: true
  },
  EventPlace: {
    type: String,
    required: true
  },
});
module.exports = Event = mongoose.model("events", EventSchema);