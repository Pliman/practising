var smsLength = 140;

function getMsgSplit(message) {
  var charCodeLength = 0,
    lengthCounter = 0;
  var content = [];
  var start = 0;
  var length = message.length;

  for (var i = 0; i < length; i++) {
    if (message.charCodeAt(i) > 128) {
      charCodeLength += 2;
      lengthCounter += 2;
    } else {
      charCodeLength += 1;
      lengthCounter += 1;
    }

    if (lengthCounter == smsLength) {
      content.push(message.substring(start, i + 1));
      start = i + 1;
      lengthCounter = 0;
    } else if (lengthCounter > smsLength) {
      content.push(message.substring(start, i));
      start = i;
      lengthCounter = message.charCodeAt(i) > 128 ? 2 : 1;
    }

    if (i == length - 1) {
      var tail = message.substring(start, i + 1);
      tail && content.push(tail);
    }
  }

  return {charCodeLength: charCodeLength, msgs: content};
}
