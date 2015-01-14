// JavaScript Document
var main_url = 'http://www.foodonline.ae/index.php/';
$(function() {
	
	//To get cities
	$.getJSON(main_url+'mobileapp/getcities',function(data){
			var template = $("#city-template").html();
			var info = Mustache.to_html(template,data);
			$("#citydropdown").html(info);
	});
	
	//To get areas
	$.getJSON(main_url+'mobileapp/getareas',function(data){
			var template = $("#area-template").html();
			var info = Mustache.to_html(template,data);
			$("#areadropdown").html(info);
	});
	
	//To Get Cuisines
	$.getJSON(main_url+'mobileapp/getcuisine',function(data){
			var template = $("#cuisine-template").html();
			var info = Mustache.to_html(template,data);
			$("#cuisinedropdown").html(info);
	});
});