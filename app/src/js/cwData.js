var app = angular.module('cwApp', []);
app.controller('cwCtrl', function($scope, $http) {
	$http.get("http://localhost:9000/patients").then(function(response) {
		$scope.patients = response.data;
	});

//	$http.get("http://localhost:9000/requests").then(function(response) {
//		$scope.requests = response.data;
//	});

//	$http.get("http://localhost:9000/reports").then(function(response) {
//		$scope.reports = response.data;
//	});

	$http.get("http://localhost:9000/acts").then(function(response) {
		$scope.acts = response.data;
	});

	$scope.default_mess="";
	$scope.medicalActs=false;

	$scope.myfunction= function(user,pass){
		$http.post("http://localhost:9000/login",{usr:user,password:pass}).then(function(response) {
					if (response.data[0]){
						$scope.aux=response.data[2]
						$scope.login=true
						$scope.doc=response.data[1]
						$scope.default_mess=""
					}else{
						$scope.login=false
						$scope.default_mess="Username or Password Incorrect !"
					}
		});
	}

	$scope.change=function(){
		$scope.default_mess=""
		$scope.login=false
	}

	$scope.dataActs=function(p){

		$scope.p_name=p.name
		$scope.p_patID=p.patID
		$scope.p_pon=p.policy_number
		$scope.p_pot=p.policy_type

		$http.post("http://localhost:9000/actsPat",{patientID:p.patID,policyType:p.policy_type}).then(function(response) {
			$scope.actsdata = response.data;
		});
	}

	$scope.save=function(p){
		$http.post("http://localhost:9000/save",{docid:$scope.doc,acttype:p.actID,patientId:$scope.p_patID,poltype:$scope.p_pot}).then(function(response) {
			$scope.actsdata = response.data;
		});
	}

	$scope.delete=function(rep){
		var index = -1;
		for( var i = 0; i < $scope.actsdata.length; i++ ) {
			if( $scope.actsdata[i].repId === rep ) {
				index = i;
				break;
			}
		}

		$scope.actsdata.splice( index, 1 );
		$http.post("http://localhost:9000/delete",{reportID:rep,patientID:$scope.p_patID,poltype:$scope.p_pot}).then(function(response) {

		});
	}

	$scope.medActs=function(){
		$scope.medicalActs=!$scope.medicalActs;
	}


});
