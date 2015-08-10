
$(document).ready(function  () {
  // body...

//we will store the user's selections here
finaldrink = {
    "Up,Sweet": ".first-choice",
    "Up,Savory": ".second-choice",
    "On The Rocks,Sweet": ".third-choice",
    "On The Rocks,Savory": ".fourth-choice"
}

animation = {
    "Up,Sweet": "#up-drink",
    "Up,Savory": "#up-drink",
    "On The Rocks,Sweet": "#rocks-drink",
    "On The Rocks,Savory": "#rocks-drink"
}
userChoices = []

//start with the bottom of the tree. 
results = 

q2 = {"choices": [
         {"answer": "Savory", "nextQuestion": null},
         {"answer": "Sweet", "nextQuestion": null}
       ]
     };
          
q1 = { "choices": 
            [
             {"answer": "Up", "nextQuestion": q2},
             {"answer": "On The Rocks", "nextQuestion": q2}
            ]
     };

function formatForClass(text){
  return text.replace(/\s/g, "-");
}
//map over each choice for a question and construct an li
//then add those li's to the question container ul
function renderQuestion(question){
    len = question["choices"].length;
    options = _(question["choices"]).map(function(choice, i){
      var option = choice["answer"];
      var optionClass = formatForClass(option);
      var returnText = "<div class='" + optionClass + "'>" + option + "</div>"
      if (i != len - 1) {
        returnText = returnText + "<p class='or'>OR</p>"
      }
      return returnText;
    });
    $('#question').html(options.join(''));
}


function activate(question) {
    //we need to set up listeners for each choice
    //so let's loop over them
    _(question["choices"]).each(function(choice){
        
      //get the text of the answer
      var answer = choice["answer"];
        
      //since we're adding the answer text as classes on
      //their associated li's, make a class selector based
      //on that asnwer text (just prefix with dot)
      var selector = formatForClass("." + answer);
        
      //set up a click listener for each answer li
      $('#question').on('click', selector, function(){
          
        //when they click an answer push it into our answers array
        userChoices.push(answer);
        
        //see if there is a next question.  The [0] part here means
        //this approach only works if the nextQuestion is the same 
        //regardless of the answer chosen
        var nextQ = question["choices"][0]["nextQuestion"]
        //if there is no nextQuestion, display the result string, which
        //can be used to look up a drink
        if (!nextQ){

            key = userChoices.join();
           console.log(finaldrink[key]);


           $(".title").fadeOut();
           $("#question-container").toggle("slide", { direction: "left"}, 500, function(){
              $(finaldrink[key]).toggle("slide", { direction: "right" }, 500);
              });
      
          // $("#question-container").toggle("slide", { direction: "left"}, 1000, function(){
          //   $(animation[key]).toggle("slide", { direction: "right"}, 1000, function(){
          //     setTimeout(function() {
          //       $(animation[key]).toggle("slide", { direction: "left"}, 1000);} 2500, function(){
          //         $(finaldrink[key]).toggle("slide", { direction: "right" }, 1000);
          //       });  
          //     });
          //   });


        //otherwise, show & set up the next Question
        }else{
            renderQuestion(nextQ);
            activate(nextQ);                
        } 
      });      
    });
  }


   renderQuestion(q1);
    activate(q1);
})
// $(function(){
//     renderQuestion(q1);
//     activate(q1);
// });

