import $ from 'jquery';

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&user_key=' + `${process.env.exports.apiKey}`;

export function getNameCall(name){
    return $.get(resource_url + "&name=" + name);
}

export function getSymptomCall(query){
    return $.get(resource_url + "&query=" + query);
}