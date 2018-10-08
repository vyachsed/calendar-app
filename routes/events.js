var express = require("express");
var router = express.Router();
const moment = require("moment");

const User = require("../models/User");
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  const event = new Event({
    title: "New test event 1",
    start: new Date(2018, 9, 8, 16),
    end: new Date(2018, 9, 8, 17)
  });

  event.save((err, event) => {
    res.json({ status: "ok", event });
  });
});

router.use(User.checkAuth({ block: true }));

router.get("/", async (req, res) => {
  let events = await Event.find().populate().lean().exec();
  events.forEach((event, key) => {
    let event_users = events[key].users.map(user => user.toString());
    if (event_users.includes(req.user._id)){
      events[key].isSubscribed = true;
    }
  });
  res.json({ status: "ok", events });
});

router.post("/subscribe/:event_id", async (req, res) => {
  let event = await Event.findOneAndUpdate(
    { _id: req.params.event_id },
    { $addToSet: { users: req.user._id } },
    { new: true }
  ).exec();
  res.json({ status: "ok", event });
});



module.exports = router;
