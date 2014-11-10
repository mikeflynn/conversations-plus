/** @jsx React.DOM */

var ConversationsPlus = React.createClass({displayName: 'ConversationsPlus',
  getInitialState: function() {
    var recoginzer = false;

    if ('webkitSpeechRecognition' in window) {
      recoginzer = new webkitSpeechRecognition();
      recoginzer.continuous = true;
      recoginzer.interimResults = true;

      recoginzer.onstart = this.onListenerStart;
      recoginzer.onresult = this.onListenerResult;
      recoginzer.onresult = function(e) {
        var transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }

        if(transcript !== '') {
          logText(transcript);
          for(var x in conversation) {
            var re = new RegExp(conversation[x].str, "ig");
            if(re.test(transcript) === true) {
              var timeout = parseInt(conversation[x].fn.call(this, transcript), 0);

              if(isNaN(timeout)) {
                timeout = 10;
              }

              pauseListen(timeout);

              return;
            }
          }
        }
      };
      recoginzer.start();
    }

    return {
      data: {
        chatter: [],
        recoginzer: recoginzer
      }
    };
  },
  onListenerResult: function(e) {

  },
  onListenerStart: function() {

  },
  render: function() {
    return (
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {id: "intro", className: "container"}, 
          React.createElement("h1", null, "Conversations Plus!"), 
          React.createElement("p", {className: "lead"}, "Making that crap you talk about more interesting, since the first time you used it.")
        ), 
        React.createElement(ChatterLog, null), 
        React.createElement(ToggleBttn, null)
      )
    );
  }
});

var ChatterLog = React.createClass({displayName: 'ChatterLog',
  render: function() {
    return (
      React.createElement("div", {id: "chatter"})
    );
  }
});

var ToggleBttn = React.createClass({displayName: 'ToggleBttn',
  render: function() {
    return (
      React.createElement("button", {id: "toggle", type: "button", className: "btn btn-danger"}, "Pause Listener")
    );
  }
});

React.render(React.createElement(ConversationsPlus, null), document.getElementById('app'));