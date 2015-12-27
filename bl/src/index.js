var doctor=require('./doctors.json')
var request=require('./requests.json')
var patient=require('./patients.json')
var acts=require('./acts.json')
var actsrmb=require('./acts-rmb.json')
var report=require('./reports.json')
var fs = require('fs')

exports = module.exports

exports.sayHello = function (name) {
  return 'Hello ' + (name || 'World')
}

exports.login = function (usr,pass) {
  for (var i=0;i<doctor.length;i++){
    if (doctor[i].user==usr){
      if (doctor[i].pass==pass){
          doc=doctor[i].name;
        aux = [];reports_filter=[];
        reports_filter = report.filter(function (el) {return el.docID == doctor[i].docID})
        for (var i=0; i<reports_filter.length; i++){
          for (var j=0; j<request.length; j++) {
            if (request[j].repID === reports_filter[i].repID){
            aux.push({reqID: request[j].reqID, repID: request[j].repID, status: request[j].status});
            }
          }
        }
        return [true,doc,aux]
      }else{
        return [false,'',[]]
      }
    }
  }
}

exports.patient= function (){
  return patient
}

exports.request= function (){
  return request
}

exports.acts= function (){
  return acts
}

exports.actsPat= function(pId,policyT){
  var reportsdata=[];var actsdata=[];var actsrembdata=[];

  actsrembdata=actsrmb.filter(function(el){
  return el.policy_type == policyT})

  for (var i=0;i<report.length;i++){
     if (pId==report[i].patID){reportsdata.push({act:report[i].actID,repid:report[i].repID})}
  }
  for (var j=0;j<reportsdata.length;j++){
    for (var i=0;i<acts.length;i++){
      if (acts[i].actID==reportsdata[j].act){actsdata.push({type:acts[i].name,cost:acts[i].cost,reimb:actsrembdata[0].reimb_percentage,repId:reportsdata[j].repid})}
    }
  }
  return actsdata
}

exports.save = function(doc,type,pID,ptype){
  actsrembdata=actsrmb.filter(function(el){
  return el.policy_type == ptype})

  report.push({"repID":report.length,"date":"1/1/2012","docID":doc,"patID":pID,"actID":type,"actual_reimb_perc":actsrembdata[0].reimb_percentage});
  fs.writeFileSync('/home/sise-cweb/Desktop/project-template/bl/src/reports.json', JSON.stringify(report))
  //var reports2=require('./reports.json')
  var reportsdata=[];var actsdata=[];

  for (var i=0;i<report.length;i++){
     if (pID==report[i].patID){reportsdata.push({act:report[i].actID,repid:report[i].repID})}
  }
  for (var j=0;j<reportsdata.length;j++){
    for (var i=0;i<acts.length;i++){
      if (acts[i].actID==reportsdata[j].act){actsdata.push({type:acts[i].name,cost:acts[i].cost,reimb:actsrembdata[0].reimb_percentage,repId:reportsdata[j].repid})}
    }
  }
  return actsdata
}

exports.delete = function (reports,patient,ptype){

  actsrembdata=actsrmb.filter(function(el){
  return el.policy_type == ptype})

  var index = -1;
  var comArr = eval(report);
  for( var i = 0; i < comArr.length; i++ ) {
    if( comArr[i].repID === reports  && comArr[i].patID === patient ) {
      index = i;
      break;
    }
  }
  report.splice( index, 1 );

  fs.writeFileSync('/home/sise-cweb/Desktop/project-template/bl/src/reports.json', JSON.stringify(report))
  //var reports2=require('./reports.json')

}
