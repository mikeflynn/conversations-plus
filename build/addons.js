ConversationsPlus.addMatcher("2pac|tupac", function(str) {
  this.setBg("https://media.giphy.com/media/WZV6PMDXEdSYE/giphy.gif");
});

ConversationsPlus.addMatcher("too\\s*many\\s*cooks", function(str) {
  this.setBg('https://media.giphy.com/media/TlK63EuYIQ1hMsMJMUo/giphy.gif');
});

ConversationsPlus.addMatcher("sexual\\s*chocolate", function(str) {
  this.setBg('https://i.imgur.com/HVD9p5W.gif');
});

ConversationsPlus.addMatcher("tacos?", function(str) {
  this.setBg('https://i.imgur.com/e0Elf.gif');
});

ConversationsPlus.addMatcher("fart", function(str) {
  this.setBg('https://i.imgur.com/HZHDT8f.jpg');
  var audio = document.createElement("audio");
  audio.src = "https://cdn.rawgit.com/mikeflynn/conversations-plus/master/htdocs/media/fart.wav";
  audio.play();
});

ConversationsPlus.addMatcher("full\\s*house", function() {
  this.setBg('https://i.imgur.com/N1mYFE6.gif');
});