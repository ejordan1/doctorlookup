// Front end logic.
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';



var resource_url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&limit=1000&user_key=${process.env.exports.apiKey}`;
// import 'bootstrap/dist/css/bootstrap.min.css';
$(document).ready(function() {
  $("#nameForm").submit(function(event){

    let nameInput = $("#name").val();

    let newUrl = resource_url + "&name=" + nameInput;
    console.log("newurl: " + newUrl);
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
    $.get(newUrl).then(function(response){
      let a = response;
      console.log(response);
      displayDoctorsInfo(response);

    }).fail(function(error){
      console.log("there was an error: ");

    })
    event.preventDefault();
  });
  $("#symptomsForm").submit(function(event){
    let symptomsInput = $("#symptoms").val();
    let newUrl = resource_url + "&query=" + symptomsInput;
    console.log("newurl: " + newUrl);
    $.get(newUrl).then(function(response){
      let a = response;
      console.log(response);
      displayDoctorsInfo(response);

    }).fail(function(error){
      console.log("there was an error: ");

    })

    event.preventDefault();
  });
});

function displayDoctorsInfo(response){
  let doctorArray = response.data;
  doctorArray.forEach(function(doctor){
    console.log(doctor.profile.name + ": " + doctor.profile.bio);
  //  console.log(doctor.profile.practices.location_slug);
  });
}
