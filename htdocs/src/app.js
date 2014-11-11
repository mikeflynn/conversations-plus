/** @jsx React.DOM */

if (window.location.protocol != "https:") {
  window.location.protocol = "https";
}

var __ConvoMatchers = [];

var ConversationsPlus = React.createClass({
  statics: {
    addMatcher: function(re, fn) {
      window.__ConvoMatchers.push({re: re, fn: fn});

      // Call custom event to trigger state update.
      var event = document.createEvent('Event');
      event.initEvent('matcherUpdate', true, true);
      document.dispatchEvent(event);
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
        background: false,
        chatter: [],
        recoginzer: recoginzer,
        matchers: [
          {re: "coolio", fn: this.handleCoolio}
        ]
      }
    };
  },
  componentWillMount: function() {

  },
  componentDidMount: function() {
    this.startInterval();
    document.addEventListener('matcherUpdate', this.onUpdatedMatchers);
  },
  componentWillUnmount: function() {
    stopInterval();
  },
  startInterval: function() {
    var $this = this;
    this.interval = setInterval(this.pauseListen, 30 * 1000);
  },
  stopInterval: function() {
    clearInterval(this.interval);
    clearTimeout(this.timer);
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

          setTimeout(this.setBg, timeout * 1000);
          this.pauseListen(timeout);

          return;
        }
      }
    }
  },
  onListenerStart: function() {

  },
  onUpdatedMatchers: function() {
    var state = this.state;
    state.data.matchers = state.data.matchers.concat(window.__ConvoMatchers);
    this.setState(state);
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
    var state = this.state;

    if(!seconds) {
      seconds = 1;
    }

    state.data.recoginzer.stop();
    state.data.listening = false;

    var $this = this;
    this.timer = setTimeout(function() {
      var state = $this.state;
      state.data.recoginzer.start();
      state.data.listening = true;
      $this.setState(state);
    }, seconds * 1000);
  },
  toggleListen: function() {
    var state = this.state;
    if(state.data.listening === true) {
      this.stopInterval();
      state.data.recoginzer.stop();
      state.data.listening = false;
    } else {
      this.startInterval();
      state.data.recoginzer.start();
      state.data.listening = true;
    }
    this.setState(state);
  },
  setBg: function(url) {
    if(!url) { url = false; }
    var state = this.state;
    state.data.background = url;
    this.setState(state);
  },
  handleCoolio: function(transcript) { // For the record: No one can truly handle Coolio.
    var images = [
      "https://i.imgur.com/fEaS9Sq.jpg",
      "https://i.imgur.com/vkeJJDE.jpg",
      "https://i.imgur.com/g1F19L4.jpg",
      "https://i.imgur.com/oTc9Hkz.jpg",
      "https://i.imgur.com/7pErUfD.jpg",
      "https://i.imgur.com/S0HaZvW.jpg",
      "https://i.imgur.com/fv5s7M0.jpg",
      "https://i.imgur.com/mpuEkfQ.jpg",
      "https://i.imgur.com/NyFhTbZ.jpg",
      "https://i.imgur.com/bpgHraM.jpg"
    ];
    this.setBg(images[Math.floor(Math.random()*images.length)]);
  },
  render: function() {
    var bgStyle = {};
    if(this.state.data.background) {
      bgStyle.backgroundImage = "url('"+this.state.data.background+"')";
    }

    return (
      <div id="main">
        <div id="bg" style={bgStyle}></div>
        <div id="intro" className="container">
          <h1>Conversations Plus!</h1>
          <p className="lead">It makes that crap you talk about more interesting.</p>
        </div>
        <ChatterLog list={this.state.data.chatter} />
        <ToggleBttn listening={this.state.data.listening} onClick={this.toggleListen} />
      </div>
    );
  }
});

var ChatterLog = React.createClass({
  render: function() {
    var chatter = this.props.list.map(function(s) {
      return <div key={s}>{s}</div>;
    });

    return (
      <div id="chatter">{chatter}</div>
    );
  }
});

var ToggleBttn = React.createClass({
  render: function() {
    var text = "Resume Listening";
    if(this.props.listening === true) {
      text = "Pause Listener";
    }

    return (
      <button id="toggle" type="button" onClick={this.props.onClick} className="btn btn-danger">{text}</button>
    );
  }
});

React.render(<ConversationsPlus />, document.getElementById('app'));