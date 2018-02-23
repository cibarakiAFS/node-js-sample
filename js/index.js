var consecutiveBlanks = -1;
var printerOn = false;
var greetings = 0;

// USER INPUT PATTERNS
var userHello = ["hey", "hiii", "hello", "what's up", "greetings"];
var userGoodbye = ["bye", "later", "goodbye", "cya", "bai"];
var userOpenEndedQuestions = ["how", "why", "when", "what", "or", "where", "who"];

// OUTPUT
var printerConfirm = ["Got it.", "Okay.", "Sure."];
var classmates = ["Bailey", "Bryan D", "Bryan A", "Carolyn", "Courtney", "Derek",
                 "Elaine", "Ellen", "Emily", "Joe", "Joe W", "Kenneth", "Liana",
                 "Mark K", "Rebecca", "Richard", "Sonyl", "David", "Morris"];
var printItems = ["SSN", "passport", "birth certificate", 
                  "bank account number", "credit card number", "text message history", "TPS report"];
var printerWarnings = ["Invalid Input", "Please Stop", "Stop.", "Stop."];
var printerGreetings = [
  "Hello, Peter",
  "Hi. Where is Samir?",
  "Beep Beep",
  "Hi, I'm Pennywise",
  "Hello, what can I print for you?",
  "Busy..."
];
var printerRandom = [
  "Uhh, did you get that memo?",
  "Well, what would you say... you do here?",
  "Please don't kick me again!"
];
var printerCommon = ["Paper Jam 00", "PC Load Letter"];
var printerQuestionAnswers = ["Yes.", "No.", "Maybe.", "Definitely."];
var printerGoodbye = [
  "Awww, come on bucko! Don't you want a balloon?",
  "Don't leave me.",
  "Don't shut me off!",
  "Don't go",
  "Don't go. I'll print anything you want!"
];


// functions
function createPrintStatement(){
  
  var affirm = printerConfirm[randomInt(printerConfirm.length)];
  var name = classmates[randomInt(classmates.length)];
  var num = randomInt(1000);
  var printjob = printItems[randomInt(printItems.length)];
  var result = affirm + " Printing " + num + " copies of " + name + "'s " + printjob;
  return result;
  
}


function reformatQuestion(question){
  var newQuestion = question.replace(/\sisn't\s/, " is ");
  
  if(newQuestion == question){
    newQuestion = question.replace(/\sis\s/, " isn't ");
  }
  
  if(newQuestion == question){
    newQuestion = question.replace(/\sare\s/, " aren't ");
  }
  
  if(newQuestion == question){
    newQuestion = question.replace(/\saren't\s/, " are ");
  }
  
  return newQuestion;
                  
}

function randomInt(int) {
  return Math.floor(Math.random() * int);
}

function createRegex(array){  
  array = array.map(function(element) {
    element = "(" + element + ")";
    return element;
  });
  
  return new RegExp(array.join("|"));
}

function contains(string, array){
  var regex = createRegex(array);
  return (string.toLowerCase() != string.toLowerCase().replace(regex,""));
}

function createResponse(prompt) {

  var isGreeting = contains(prompt, userHello);
  var isGoodbye = contains(prompt, userGoodbye);
  
  if(prompt.toLowerCase()=="off"){
        if (printerOn) {
          printerOn = false;
          return ("Printer Status: OFF");
      }
  }

  if(isGreeting){
    
    if(greetings < 3){
      greetings ++;
      return printerGreetings[randomInt(printerGreetings.length)];
    }else{
      return "Yes?";
    }
  }
  
  if(isGoodbye){
    greetings = 0;
    return printerGoodbye[randomInt(printerGoodbye.length)];       
  }
  
  if(prompt.endsWith("?")){
    greetings = 0;
    var openEnded = contains(prompt, userOpenEndedQuestions);
    if(openEnded){
      return "I don't know... " + reformatQuestion(prompt);
    }else{
      return printerQuestionAnswers[randomInt(printerQuestionAnswers.length)];       
    }
  }
  
  if(contains(prompt, ["my"])){
    return "No. " + prompt.replace(/(my)|(My)/, "MY");
  }
  
  var ran = randomInt(100);
  if(ran < 40){
    return createPrintStatement();
  }
  
  if(ran >= 40 && ran < 70){
    return printerRandom[randomInt(printerRandom.length)];
  }
  
  return printerCommon[randomInt(printerCommon.length)];
  
}

function addToList(list, newThing, itemClass){
  if (newThing === undefined) {
    newThing = "Paper Jam 00";
  }
  var li = document.createElement("li");
  li.className = itemClass;
  var liText = document.createTextNode(newThing);
  li.appendChild(liText);
  list.appendChild(li);
  
  var lis = document.querySelectorAll('#dave-list li');
  if(lis.length > 20){
    list.removeChild(lis[0]);
  }
}

window.onload = function() {
  // when someone clicks the button...
  chatInput = document.getElementById("chatInput");
  chatInput.addEventListener("keypress", function(event) {
                             
    if (event.keyCode == 13) {
      
      event.preventDefault();
      input = document.getElementById("chatInput").value.trim();
      list = document.getElementById("dave-list");

      addToList(list, input, "user-output");

      if (!printerOn) {
        addToList(document.getElementById("dave-list"), "Printer Status: ON","printer-output");
        printerOn = true;
      }

      if (input === "") {
        consecutiveBlanks++;
        addToList(
          document.getElementById("dave-list"),
          printerWarnings[consecutiveBlanks],
          "printer-output"
        );
      } else {
        consecutiveBlanks = -1;
        addToList(
          document.getElementById("dave-list"), 
          createResponse(input),
          "printer-output");
        document.getElementById("chatInput").value = "";
      }
    }
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
};
