/** @jsx React.DOM */

var ConversationsPlus = React.createClass({displayName: 'ConversationsPlus',
  render: function() {
    return (
      React.DOM.div( {id:"main"}, 
        React.DOM.div( {id:"intro", className:"container"}, 
          React.DOM.h1(null, "Conversations Plus!"),
          React.DOM.p( {className:"lead"}, "Making that crap you talk about more interesting, since the first time you used it.")
        ),
        ChatterLog(null ),
        ToggleBttn(null )
      )
    );
  }
});

var ChatterLog = React.createClass({displayName: 'ChatterLog',
  render: function() {
    return (
      React.DOM.div( {id:"chatter"})
    );
  }
});

var ToggleBttn = React.createClass({displayName: 'ToggleBttn',
  render: function() {
    return (
      React.DOM.button( {id:"toggle", type:"button", className:"btn btn-danger"}, "Pause Listener")
    );
  }
});

React.render(ConversationsPlus(null ), document.getElementByTag('body'));