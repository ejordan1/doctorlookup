// Front end logic.
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&user_key=' + exports.apiKey;

// import 'bootstrap/dist/css/bootstrap.min.css';
setInterval(function(){
  console.log("a");
}, 1000);
$(document).ready(function() {
  $("#userInputForm").submit(function(event){
    // let long = parseFloat($("#userLong").val());
    // let lat = parseFloat($("#userLat").val());
    // // placeholder clouds
    // let cloud_score = false;
    // // placeholder date
    //   // debugger;
    //   //only works so far with 2014
    // let date = $("#userDate").val().toString();
    // let date2 = "1995-05-02";
    // let dateStringGetter = `${date}`;
    // if (date === dateStringGetter){
    //   console.log("true");
    // }
    // let resolution = 0.8816 - parseFloat($("#resolutionRange").val());

    $.get(resource_url).then(function(response){
      let a = response;
      console.log(response);

    }).fail(function(error){
      console.log("there was an error: ");

    })
    // $.get(`https://api.nasa.gov/planetary/earth/imagery/?lon=${long}&lat=${lat}&cloud_score=${cloud_score}&api_key=${process.env.API_KEY}&dim=${resolution}`).then(function(response){
    //   $("#imageRow").html("<img src='" + `${response.url}` +"'</img>");
    //   console.log(response.url);
    //   console.log(response);
    //   console.log(response.toString());
    //   console.log("Success");
    // }).fail(function(error){
    //   $("#imageRow").html("<h1>There was an error processing your request. Please try a new location or date.</h1>");
    //   console.log("Error!");
    //   console.log(`${resolution}`);
    // });
    // Date nust be given in year-mm-dd
    event.preventDefault();
  });
});
