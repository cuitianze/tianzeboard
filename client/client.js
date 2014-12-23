
/**
 * Created by bluesky on 14-12-23.
 */



Template.leaderboard.helpers({
  'player': function() {
    var currentUserId = Meteor.userId();
    return PlayersList.find({}, {sort: {age: -1, name: 1}});
  },
  'count': function() {
    return PlayersList.find().count();
  },
  'selectedClass': function() {
    var playerId =  this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer) {
      return "selected";
    }
  },
  'showSelectedPlayer': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }
});

Template.leaderboard.events({

  'click .player': function() {
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
  },
  'mouseout .players': function() {
    //var playerId = this._id;
    //Session.set('selectedPlayer', '');
  },
  'mouseover': function() {
  },

  'click .increment': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerAge', selectedPlayer, 5);
  },
  'click .decrement': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerAge', selectedPlayer, -5);
  },
  'click .remove': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    var removeConfirm = confirm('您真的要删除吗？');
    if(removeConfirm) {
      Meteor.call('removePlayerData', selectedPlayer);
    }
  }

});

Template.addPlayerForm.events({
  'submit form': function(event) {
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    if(playerNameVar.trim()) {
      Meteor.call('insertPlayerData', playerNameVar);
    }
    event.target.playerName.value = '';
  }
});



Meteor.subscribe('thePlayers');


