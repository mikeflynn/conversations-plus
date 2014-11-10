var ConversationsPlus = React.createClass({
  render: function() {
    return (
      <div id="main">
        <div id="intro" className="container">
          <h1>Conversations Plus!</h1>
          <p className="lead">Making that crap you talk about more interesting, since the first time you used it.</p>
        </div>
        <ChatterLog />
        <ToggleBttn />
      </div>
    );
  }
});

var ChatterLog = React.createClass({
  render: function() {
    return (
      <button id="toggle" type="button" className="btn btn-danger">Pause Listener</button>
    );
  }
});

var ToggleBttn = React.createClass({
  render: function() {
    return (
      <button id="toggle" type="button" className="btn btn-danger">Pause Listener</button>
    );
  }
});

React.render(<ConversationsPlus />, document.getElementByTag('body'));