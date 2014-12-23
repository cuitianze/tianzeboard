/**
 * Created by bluesky on 14-12-23.
 */


Meteor.methods({
  'insertPlayerData': function(playerNameVar) {
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerNameVar,
      age: 0,
      createdBy: currentUserId
    });
  },
  'removePlayerData': function(selectedPlayer) {
    PlayersList.remove(selectedPlayer);
  },
  'modifyPlayerAge': function(selectedPlayer, value) {
    PlayersList.update(selectedPlayer,{$inc: {age: value}});
  }
});




Meteor.publish('thePlayers', function() {
  var currentUserId = this.userId;
  return PlayersList.find({createdBy: currentUserId});
});