// Front end logic.
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import linesImage from './../img/Booklines.png';

let lines = document.getElementById("lines");
lines.src = linesImage;

let clientDoctorArray = [];
let currentPage = -1;

var resource_url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&limit=1000&user_key=${process.env.exports.apiKey}`;
// import 'bootstrap/dist/css/bootstrap.min.css';
$(document).ready(function() {
    $(".doctorCard").hide();
    $(".endPage").hide();

  $("#nameForm").submit(function(event){
    currentPage = -1;
    let nameInput = $("#name").val();
    $(".bookTitle").text("The Doctor " + nameInput + " Book");
    let newUrl = resource_url + "&name=" + nameInput;
    console.log("newurl: " + newUrl);
    $.get(newUrl).then(function(response){

      console.log(response);
      clientDoctorArray = response.data;

      updatePage();
    }).fail(function(error){
      console.log("there was an error: ");
    })
    event.preventDefault();
  });
  $("#symptomsForm").submit(function(event){
    currentPage = -1;
    updatePage();
    let symptomsInput = $("#symptoms").val();
    $(".bookTitle").text("The Doctors of " + symptomsInput + " Book");
    let newUrl = resource_url + "&query=" + symptomsInput;
    console.log("newurl: " + newUrl);
    $.get(newUrl).then(function(response){
      let a = response;
      console.log(response);
      clientDoctorArray = response.data;
      if (response.data.length >= 1){
      displayDoctorsInfo(currentPage);
      }
      //else : NO DOCTORS WITH SEARCH PROVIDED

    }).fail(function(error){
      console.log("there was an error: ");

    })

    event.preventDefault();
  });
  $(".rightArrow button").click(function(){

    if (currentPage === clientDoctorArray.length){
      alert("that was the last page");
    } else {

        currentPage++;
    }
    updatePage();
  });
  $(".leftArrow button").click(function(){

    if (currentPage === -1){
    } else {
        currentPage--;
    }
    updatePage();
  });
});

function displayDoctorsInfo(index){
  resetFields();

    let doc = clientDoctorArray[index];
    if (doc){
      $("#card0 .docName").text(doc.profile.first_name + " " + doc.profile.last_name);
      $("#card0 .docBio").text(doc.profile.bio)

      $("#card0 .docAddress").text(doc.practices[0].visit_address.street + ", " + doc.practices[0].visit_address.city + ", " + doc.practices[0].visit_address.state + ", " + doc.practices[0].visit_address.zip);

      $("#card0 .docPhone").text("Phone Number: " + doc.practices[0].phones[0].number)

      $("#card0 .docWebsite").text("Website: " + doc.practices[0].website)

      $("#card0 .docNewPatients").text("Accepts new patients: " +

      doc.practices[0].accepts_new_patients)
      //if (doc.profile.image_url){
        console.log(doc.profile.image_url);
        $("#card0 .pic").attr("src", doc.profile.image_url);
      //}
    }
}

function resetFields(){
  $("#card0 .docName").text("no name provided");
  $("#card0 .docBio").text("no bio provided");
  $("#card0 .docAddress").text("no address provided");
  $("#card0 .docPhone").text("no phone number provided");
  $("#card0 .docNewPatients").text("no info on if accepting new patients");
  $("#card0 .pic").attr("src", "");
}
function updatePage(){
  if (currentPage === -1){
    //display title page
    $(".leftArrow").hide();
    $(".rightArrow").show();
    $(".doctorCard").hide();
    $(".coverPage").show();
    $(".endPage").hide();
  } else if(currentPage === clientDoctorArray.length){
    //display the end page
    $(".leftArrow").show();
    $(".rightArrow").hide();
    $(".coverPage").hide();
    $(".doctorCard").hide();
    $(".endPage").show();
  } else {
    $(".rightArrow").show();
    $(".leftArrow").show();
    $(".doctorCard").show();
    displayDoctorsInfo(currentPage);
    $(".coverPage").hide();
    $(".endPage").hide();
  }
}
