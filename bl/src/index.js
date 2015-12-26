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
        return [true,doctor[i].name]
      }else{
        return [false,'']
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
     if (pId==report[i].patID){reportsdata.push({act:report[i].actID})}
  }
  for (var j=0;j<reportsdata.length;j++){
    for (var i=0;i<acts.length;i++){
      if (acts[i].actID==reportsdata[j].act){actsdata.push({type:acts[i].name,cost:acts[i].cost,reimb:actsrembdata[0].reimb_percentage})}
    }
  }
  return actsdata
}

exports.save = function(type,name,cost,pID,ptype){
  actsrembdata=actsrmb.filter(function(el){
  return el.policy_type == policyT})

  report.push({"repID":report.length,"date":"1/1/2012","docID":1,"patID":pID,"actID":type,"actual_reimb_perc":actsrembdata[0].reimb_percentage});
  fs.writeFileSync('/home/sise-cweb/Desktop/project-template/bl/src/reports.json', JSON.stringify(report))
  var acts=require('./reports.json')
  var reportsdata=[];var actsdata=[];var actsrembdata=[];

  actsrembdata=actsrmb.filter(function(el){
  return el.policy_type == policyT})

  for (var i=0;i<report.length;i++){
     if (pId==report[i].patID){reportsdata.push({act:report[i].actID})}
  }
  for (var j=0;j<reportsdata.length;j++){
    for (var i=0;i<acts.length;i++){
      if (acts[i].actID==reportsdata[j].act){actsdata.push({type:acts[i].name,cost:acts[i].cost,reimb:actsrembdata[0].reimb_percentage})}
    }
  }
  return actsdata
}
