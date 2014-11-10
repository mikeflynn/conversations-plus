/** @jsx React.DOM */

var ConversationsPlus = React.createClass({displayName: 'ConversationsPlus',
  statics: {
    addMatcher: function(re, fn) {
      var state = this.state;

      state.data.matchers.push({re: re, fn: fn});
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
        recoginzer: recoginzer,
        matchers: [
          {re: "coolio", fn: this.handleCoolio}
        ]
      }
    };
  },
  componentWillMount: function() {
    this.interval = false;
  },
  componentDidMount: function() {
    var $this = this;
    this.interval = setInterval(this.pauseListen, 30 * 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
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

      var conversation = this.state.data.matchers;
      for(var x in conversation) {
        var re = new RegExp(conversation[x].re, "ig");
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
      state.data.chatter.shift();
    }

    state.data.chatter.push(text);
    this.setState(state);
  },
  pauseListen: function(seconds) {
    if(!seconds) {
      seconds = 1;
    }

    this.state.data.recoginzer.stop();
    var $this = this;
    setTimeout(function() {
      $this.state.data.recoginzer.start();
    }, seconds * 1000);
  },
  toggleListen: function() {
    if(this.state.data.listening === true) {
      this.state.data.recoginzer.stop();
    } else {
      this.state.data.recoginzer.start();
    }

  },
  handleCoolio: function() {
    console.log("COOLIO!!!!");
  },
  render: function() {
    return (
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {id: "intro", className: "container"}, 
          React.createElement("h1", null, "Conversations Plus!"), 
          React.createElement("p", {className: "lead"}, "It makes that crap you talk about more interesting.")
        ), 
        React.createElement(ChatterLog, {list: this.state.data.chatter}), 
        React.createElement(ToggleBttn, {listening: this.state.data.listening, onclick: this.toggleListen})
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
      React.createElement("button", {id: "toggle", type: "button", onclick: this.props.onclick, className: "btn btn-danger"}, text)
    );
  }
});

React.render(React.createElement(ConversationsPlus, null), document.getElementById('app'));