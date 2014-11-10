window.onload = function() {
  if ('webkitSpeechRecognition' in window) {
    window.recoginzer = new webkitSpeechRecognition();
    recoginzer.continuous = true;
    recoginzer.interimResults = true;

    recoginzer.onstart = function() {

    };

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
  } else {
    console.log("No talkie for you!");
  }

  setInterval(function() { pauseListen(1); }, 30 * 1000);
};

var pauseListen = function(seconds) {
  window.recoginzer.stop();
  setTimeout(function() {
    window.recoginzer.start();
  }, seconds * 1000);
};

var log = function(text) {
  jQuery('h1#text').text(text).fadeOut(5000, function() {
    jQuery('h1#text').text('').show();
  });
};

var logText = function(text, matched) {
  var highlight = "";
  if(matched) {
    highlight = "highlight";
  }

  jQuery('#chatter').prepend('<div class="' + highlight + '">' + text + '</div>');
};

var conversation = [
  {str: "coolio", fn: log},
  {str: "(gift?\\s*\\/\\s*)know|no", fn: log},
  {str: "(gift?\\s*\\/\\s*)yes", fn: log},
];