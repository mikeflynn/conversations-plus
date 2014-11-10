/** @jsx React.DOM */

var ConversationsPlus = React.createClass({displayName: 'ConversationsPlus',
  statics: {
    addMatcher: function(re, fn) {

    }
  },
  getInitialState: function() {
    var recoginzer = false;

    if ('webkitSpeechRecognition' in window) {
      recoginzer = new webkitSpeechRecognition();
      recoginzer.continuous = true;
      recoginzer.interimResults = true;
      recoginzer.onstart = this.onListenerStart;
      recoginzer.onresult = this.onListenerResult;

      recoginzer.start();
    }

    return {
      data: {
        listening: true,
        chatter: [],
        recoginzer: recoginzer
      }
    };
  },
  componentDidMount: function() {

  },
  onListenerResult: function(e) {
    var transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript;
      }
    }

    if(transcript !== '') {
      this.addChatter(transcript);
      for(var x in conversation) {
        var re = new RegExp(conversation[x].str, "ig");
        if(re.test(transcript) === true) {
          var timeout = parseInt(conversation[x].fn.call(this, transcript), 0);

          if(isNaN(timeout)) {
            timeout = 10;
          }

          this.pauseListen(timeout);

          return;
        }
      }
    }
  },
  onListenerStart: function() {

  },
  addChatter: function(text, matched) {
    var state = this.state;
    if(state.data.chatter.length > 7) {
      state.data.chatter.pop();
    }

    state.data.chatter.push(text);
    this.setState(state);
  },
  pauseListen: function(seconds) {
    this.state.recoginzer.stop();
    setTimeout(function() {
      this.state.recoginzer.start();
    }, seconds * 1000);
  },
  render: function() {
    return (
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {id: "intro", className: "container"}, 
          React.createElement("h1", null, "Conversations Plus!"), 
          React.createElement("p", {className: "lead"}, "Making that crap you talk about more interesting, since the first time you used it.")
        ), 
        React.createElement(ChatterLog, {list: this.state.data.chatter}), 
        React.createElement(ToggleBttn, {listening: this.state.data.listening})
      )
    );
  }
});

var ChatterLog = React.createClass({displayName: 'ChatterLog',
  render: function() {
    var chatter = this.props.list.map(function(s) {
      return React.createElement("div", {key: s}, s);
    });

    return (
      React.createElement("div", {id: "chatter"}, chatter)
    );
  }
});

var ToggleBttn = React.createClass({displayName: 'ToggleBttn',
  render: function() {
    var text = "Resume Listening";
    if(this.props.listening === true) {
      text = "Pause Listener";
    }

    return (
      React.createElement("button", {id: "toggle", type: "button", className: "btn btn-danger"}, text)
    );
  }
});

React.render(React.createElement(ConversationsPlus, null), document.getElementById('app'));

// Custom

var conversation = [
  {str: "coolio", fn: log},
  {str: "(gift?\\s*\\/\\s*)know|no", fn: log},
  {str: "(gift?\\s*\\/\\s*)yes", fn: log},
];