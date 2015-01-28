// JavaScript Document
var main_url = 'http://www.foodonline.ae/index.php/';
$(function() {
   
    $(".sidepanel").load('slide-panel.html');
});
$(function() {
	
	//To get cities
	$.ajax({
			dataType:"JSON",
			cache:false,
			type:"POST",
			url:main_url+'mobileapp/getcities',
			data:"",
			success: function(data) {
				var template = $("#city-template").html();
				var info = Mustache.to_html(template,data);
				//alert(data);
				$("#citydropdown").html(info);
				$('.selectpicker').selectpicker({
					style: 'btn-customsearch'
				});	
			}
	});
	
	/*$.getJSON(main_url+'mobileapp/getcities',function(data){
			var template = $("#city-template").html();
			var info = Mustache.to_html(template,data);
			alert(data);
			$("#citydropdown").html(info);
			$('.selectpicker').selectpicker({
				style: 'btn-customsearch'
			});	
	});*/
	
	//To get areas
	$.getJSON(main_url+'mobileapp/getareas',function(data){
			var template = $("#area-template").html();
			var info = Mustache.to_html(template,data);
			$("#areadropdown").html(info);
			$('.selectpicker').selectpicker({
				style: 'btn-customsearch'
			});	
	});
	
	//To Get Cuisines
	$.getJSON(main_url+'mobileapp/getcuisine',function(data){
			var template = $("#cuisine-template").html();
			var info = Mustache.to_html(template,data);
			$("#cuisinedropdown").html(info);
			$('.selectpicker').selectpicker({
				style: 'btn-customsearch'
			});	
	});
	
	//FUNCTION TO SEARCH RESTAURANTS
	$('#buttonSearch').bind('click', function () {
		$("#searchRestaurantResults").removeClass('fd-bannerIndex');
		$.ajax({
			dataType:"JSON",
			cache:false,
			type:"POST",
			url:main_url+'mobileapp/searchrestaurant',
			data:{city: $("#citydropdown").val(),area:$("#areadropdown").val(), cuisine:$("#cuisinedropdown").val()},
			success: function(data) {
				var template = $("#searchrest-template").html();
				var info = Mustache.to_html(template,data);
				$("#searchRestaurant").html(info).find("ul").listview('refresh');
				$.mobile.changePage( "#searchRestaurantsPage", { transition: "slide"} );
				
			},
			complete: function(data) {
			  $('#searchRestaurant').listview('refresh'); 
			} 
			
		});
	});
});

function loadRestaurantDetails(rid) {
		$("#RestaurantDetailsBlock").removeClass('fd-bannerIndex');
		$.ajax({
			dataType:"JSON",
			cache:false,
			type:"POST",
			url:main_url+'mobileapp/restaurantdetails',
			data:{RID: rid},
			success: function(data) {
				//alert(data);
				var template = $("#restaurantdetails-template").html();
				var info = Mustache.to_html(template,data);
				$("#RestaurantDetailsDiv").html(info);
				 console.log(info);
				 
				$.mobile.changePage( "#RestaurantDetailsPage", { transition: "slide"} );
				
			},
			complete: function(data) {
			  //$('#RestaurantDetailsDiv').listview('refresh'); 
			} 
			
		});	
}
function onclickcollapse() {
	$('.collapse').on('shown.bs.collapse', function(){
		$(this).parent().find(".glyphicon-chevron-right").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
		}).on('hidden.bs.collapse', function(){
		$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
	});		
}