import $ from 'jquery';


export function getCall(newUrl){
    return $.get(newUrl);
}