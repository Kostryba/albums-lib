var app = angular.module('app', ['ngAnimate']);

app.controller('MyController', function($http,$scope,$location,$timeout,$anchorScroll){
 	
	$scope.album = {
		title : null,
	    artist : null,
	    year : null,
	    logoUrl : null,
	    company : null,
	    country : null,
	    price : null
	};

	var getCount = function () {
			$http.get('http://localhost:8000/albums/count')
		        .success(function(result){
		   
		            $scope.count =  angular.fromJson(result);

		        })
		        .error(function(result){
		            console.log("error when get count of albums");
		        })
	};	        



//==============show/hide buttons ======================
	$scope.showButton = false;


    $scope.showButtons = function () {
		this.showButton = true;	
	};

	$scope.hideButtons = function () {
		this.showButton = false;
	};

//==============validate input data ======================
	$scope.yearClass = "";
	$scope.saveButtonDisabled = {
		year : true,
		price : true
	};	


	$scope.validateYear = function(year){
 		
 		if (!isNaN(year) && year.length <= 4) {
 		
 			$scope.yearClass = "";
 			$scope.saveButtonDisabled.year = false;
 		} else {
 			$scope.yearClass = "red-border";
 			$scope.saveButtonDisabled.year = true;
 		}
 	};

 	$scope.validatePrice = function(price){
 	
 		if (!isNaN(price)) {
 			
 			$scope.priceClass = "";
 			$scope.saveButtonDisabled.price = false;
 		} else {
 			$scope.priceClass = "red-border";
 			$scope.saveButtonDisabled.price = true;
 		}
 	};
		

//==============show/hide editor ======================

	$scope.editor = {
 		show   : false
 	};

 	$scope.showEditor = function(){
 		if ($scope.editor.show ){
 			$scope.editor.show = false;
 		} else {
 			$scope.editor.show = true;
 		}

		$scope.album = {
			title : null,
			artist : null,
			year : null,
			logoUrl : null,
			company : null,
			country : null,
		    price : null,
			id : null
		};

		$scope.editButtonShow = false;
		$scope.saveButtonDisabled.year = true;
		$scope.saveButtonDisabled.price = true;
 	};

//========================CRUD======================================

//===========================read==========================

var getAll = function() {
		
			$http.get('http://localhost:8000/albums/all')
	        .success(function(result){
	         console.log("albums from getAll",result);
				$scope.albums = result;
 		
	        })
	        .error(function(result){
	            console.log("error when get all albums");
	        })
	};

	
	getAll();

//=================add ==============================

      
	$scope.addAlbum = function (album) {


		$http.post('http://localhost:8000/albums/add', album)
          	.success(function(result){
           		console.log("album added at backend",album);
           		
           		album.title = null;
           		album.artist = null;
           		album.year = null;
           		album.logoUrl = null;
           		album.company = null;
           		album.country = null;
           		album.price = null;

				getAll();

          	})
          	.error(function(result){
             	console.log("error when addAlbum method called ");
         	})
		
		$scope.saveButtonDisabled.year = true;
		$scope.saveButtonDisabled.price = true;

		$location.hash("bottom");
        $anchorScroll();

	};

//=================edit ==============================
	$scope.editButtonShow = false;

	$scope.editorCancel = function (album) {
				album.title = null;
           		album.artist = null;
           		album.year = null;
           		album.logoUrl = null;
           		album.company = null;
           		album.country = null;
           		album.price = null;

		$scope.saveButtonDisabled.year = true;
		$scope.saveButtonDisabled.price = true;	
		$scope.editButtonShow = false;
	};


	$scope.editorRun = function (album) {
		$scope.editButtonShow = true;
		$scope.saveButtonDisabled.year = false;
		$scope.saveButtonDisabled.price = false;

		$scope.album = {
			title : album.title,
		    artist : album.artist,
		    year : String(album.year),
		    logoUrl : album.logoUrl,
		    company : album.company,
		    country : album. country,
		    price : String(album.price),
		    id: album.id
		};
	};


	$scope.editAlbum = function (album) {
		$http.post('http://localhost:8000/albums/update/'+ $scope.album.id, $scope.album)
          	.success(function(result){
           		console.log("album edited at backend",album);
           		
           		album.title = null;
           		album.artist = null;
           		album.year = null;
           		album.logoUrl = null;
           		album.company = null;
           		album.country = null;
           		album.price = null;

				getAll();
				$scope.editButtonShow = false;
				$scope.saveButtonDisabled.year = true;
		$scope.saveButtonDisabled.price = true;
          	})
          	.error(function(result){
             	console.log("error when editAlbum method called ");
         	})

};


//=================delete ==============================

	$scope.deleteAlbum = function (album) {

		$http.delete('http://localhost:8000/albums/delete/' + album.id)
          	.success(function(result){
           		console.log("album deleted at backend");
           	    getAll();
          	})
          	.error(function(result){
             	console.log("error when delete method called ");
         	})
	};


//============UP ==============================

$scope.upButton = false;
 var upButtomLoad = function(){
	$scope.upButton = true;
 };
$timeout(upButtomLoad, 1000);




$scope.UP = function(){
	$location.hash("top");
        $anchorScroll();
}
  


 

});// controller close


