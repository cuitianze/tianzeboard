console.log('hello, cuitianze, welcome you to meteor world');

PlayersList = new Mongo.Collection('players');
//PlayersList.remove({});

if(Meteor.isClient) {
  Meteor.subscribe('thePlayers');
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
      //console.log('1');
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer,{$inc: {age: 5}});
    },
    'click .decrement': function() {
      //console.log('1');
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer,{$inc: {age: -5}});
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      var removeConfirm = confirm('您真的要删除吗？');
      if(removeConfirm)
      {
        PlayersList.remove(selectedPlayer);
      }
    }

  });

  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      if(playerNameVar.trim()) {
        PlayersList.insert({
          name: playerNameVar,
          age: 0,
          createdBy: currentUserId
        });
        event.target.playerName.value = '';
      }
      Meteor.call('sendLogMessage');
    }
  })


}

if(Meteor.isServer) {
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });
  Meteor.methods({
    'sendLogMessage': function() {
      console.log("hello world");
    }
  })
}