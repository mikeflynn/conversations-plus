/** @jsx React.DOM */

var ConversationsPlus = React.createClass({displayName: 'ConversationsPlus',
  getInitialState: function() {
    return {
      data: {
        chatter: [],
        recoginzer: new webkitSpeechRecognition()
      }
    };
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