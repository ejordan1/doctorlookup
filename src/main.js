// Front end logic.
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import linesImage from './../img/Booklines.png';
import {getCall} from './backend.js';

let lines = document.getElementById("lines");
lines.src = linesImage;

let clientDoctorArray = [];
let currentPage = -1;


// import 'bootstrap/dist/css/bootstrap.min.css';
$(document).ready(function() {
    $(".doctorCard").hide();
    $(".endPage").hide();
    $(".noPages").hide();
    $(".leftArrow").hide();

  $("#nameForm").submit(function(event){
    $(".error").text("");
    currentPage = -1;
    let nameInput = $("#name").val();
    $("#name").val("");
    $(".bookTitle").text("The Portland Doctor " + nameInput + " Book");
    let newUrl = resource_url + "&name=" + nameInput;
    $.get(newUrl).then(function(response){
     // getCall(newUrl).then(function(response){
      clientDoctorArray = response.data;
      if (clientDoctorArray.length > 0){
        updatePage();
        $(".noPages").hide();
      } else {
        $(".noPages").show();
      }

    }).fail(function(error){
      $(".error").text("There was an error processing your search request" + error.message);
    });
    event.preventDefault();
  });
  $("#symptomsForm").submit(function(event){
      $(".error").text("");
    currentPage = -1;
    updatePage();
    let symptomsInput = $("#symptoms").val();
    $("#symptoms").val("");
    $(".bookTitle").text("The Portland Doctors of " + symptomsInput + " Book");
    let newUrl = resource_url + "&query=" + symptomsInput;
    console.log("newurl: " + newUrl);
    $.get(newUrl).then(function(response){
      let a = response;
      console.log(response);
      clientDoctorArray = response.data;
      if (clientDoctorArray.length > 0){
        updatePage();
        $(".noPages").hide();
      } else {
        $(".noPages").show();
      }
      //else : NO DOCTORS WITH SEARCH PROVIDED

    }).fail(function(error){
        $(".error").text("There was an error processing your search request: " + error.message);
    })

    event.preventDefault();
  });
  $(".rightArrow button").click(function(){

    if (currentPage === clientDoctorArray.length){
      alert("somehow got to after the last page. whoops");
    } else {

        currentPage++;
    }
    updatePage();
  });
  $(".leftArrow button").click(function(){

    if (currentPage === -1){
        alert("somehow got to before the first page. whoops");
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
