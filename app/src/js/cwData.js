var app = angular.module('cwApp', []);
var data =[];
app.controller('cwCtrl', function($scope, $http) {
	$http.get("http://127.0.0.1:8090/doctors.json").then(function(response) {
		$scope.data=response.data;
	});
	// $scope.username = 'John Doe';
    // $scope.password = 'pass';
	$scope.myfunction= function(user,pass){
		for (var i=0;i<$scope.data.length;i++){
			if ($scope.data[i].user===user){
				if ($scope.data[i].pass===pass){
					$scope.login=true
				}else{
					$scope.login=false
				}
			}
		}
	}
	$scope.errorMessage=function(){
		if ($scope.login){
			return "Username or Password Incorrect";
		}else{
			return ""
		}
		
	}
}); 

app.controller('dataCtrl', function($scope, $http) {
	$http.get("http://127.0.0.1:8090/acts.json").then(function(response) {
		$scope.acts = response.data;
	});

});

// function myFunction() {
		// if (1==1){
			// var x = document.getElementById($scope.user.password).value;
			// document.getElementById($scope.user.sub).innerHTML = "You wrote: " + x;
			// show('Page2','Page1');
			// return
// }
		// }
		
		// function show(shown, hidden) {
		  // document.getElementById(shown).style.display='block';
		  // document.getElementById(hidden).style.display='none';
		  // return false;
		// }