window.onload = function() {
  if ('webkitSpeechRecognition' in window) {
    var recoginzer = new webkitSpeechRecognition();
    recoginzer.continuous = true;
    recoginzer.interimResults = true;
    recoginzer.onresult = function(e) {
      var transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }

      if(transcript !== '') {
        console.log("You said: " + transcript);

        for(var x in conversation) {
          var re = new RegExp(conversation[x].str, "ig");
          if(re.test(transcript) === true) {
            var timeout = parseInt(conversation[x].fn.call(this, transcript), 0);

            if(isNaN(timeout)) {
              timeout = 10;
            }

            recoginzer.stop();
            setTimeout(function() { recoginzer.start(); }, timeout * 1000);

            return;
          }
        }
      }
    };
    recoginzer.start();
  } else {
    console.log("No talkie for you!");
  }
};

var log = function(text) {
  jQuery('h1#text').text(text).fadeOut(5000, function() {
    jQuery('h1#text').text('').show();
  });
};

var conversation = [
  {str: "coolio", fn: log},
  {str: "(gift?\\s*\\/\\s*)know|no", fn: log},
  {str: "(gift?\\s*\\/\\s*)yes", fn: log},
];
