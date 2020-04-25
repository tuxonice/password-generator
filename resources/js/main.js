

function generate(size, options) 
{
  var stringLowerCaseAll = "abcdefghijklmnopqrstuvwxyz";
  var stringUpperCaseAll = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var stringLowerCase = "abcdefghijmnpqrstuvxz";
  var stringUpperCase = "ABCDEFGHJLMNPQRSTUVXZ";
  var numeric = '0123456789';
  var symbols = "!?@#$%&_,.:;(){}[]*+-=|/"
  var array = new Uint8Array(size);
  window.crypto.getRandomValues(array);

  var c = [];
  if(options.includes("symbols")){
    c.push(symbols);
  }
	
  if(options.includes("numbers")){
    c.push(numeric);
  }
	
  if(options.includes("exclude_similar")) {
    if(options.includes("lowercase")){
      c.push(stringLowerCase);
    }
	  
    if(options.includes("uppercase")){
      c.push(stringUpperCase);
    }
  } else {
    if(options.includes("lowercase")){
      c.push(stringLowerCaseAll);
    }
	  
    if(options.includes("uppercase")){
      c.push(stringUpperCaseAll);
    }
  }

  c = shuffle(c);
  var str = c.join('');
  var psw = '';
  for (var i = 0; i < array.length; i++) { 
    x = (array[i] * (str.length-1)) / 255;
    idx = Math.floor(x)
    psw += str[idx];
  }
  
  return psw;
}



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
