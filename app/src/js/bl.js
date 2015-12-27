(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports=[{"actID":0,"policy_type":0,"reimb_percentage":1},{"actID":0,"policy_type":1,"reimb_percentage":0.8},{"actID":0,"policy_type":2,"reimb_percentage":0.5},{"actID":0,"policy_type":3,"reimb_percentage":0.2},{"actID":1,"policy_type":0,"reimb_percentage":1},{"actID":1,"policy_type":1,"reimb_percentage":0.8},{"actID":1,"policy_type":2,"reimb_percentage":0.5},{"actID":1,"policy_type":3,"reimb_percentage":0.2},{"actID":2,"policy_type":0,"reimb_percentage":1},{"actID":2,"policy_type":1,"reimb_percentage":0.8},{"actID":2,"policy_type":2,"reimb_percentage":0.5},{"actID":2,"policy_type":3,"reimb_percentage":0.2},{"actID":3,"policy_type":0,"reimb_percentage":1},{"actID":3,"policy_type":1,"reimb_percentage":0.8},{"actID":3,"policy_type":2,"reimb_percentage":0.5},{"actID":3,"policy_type":3,"reimb_percentage":0.2},{"actID":4,"policy_type":0,"reimb_percentage":1},{"actID":4,"policy_type":1,"reimb_percentage":0.8},{"actID":4,"policy_type":2,"reimb_percentage":0.5},{"actID":4,"policy_type":3,"reimb_percentage":0.2},{"actID":5,"policy_type":0,"reimb_percentage":1},{"actID":5,"policy_type":1,"reimb_percentage":0.8},{"actID":5,"policy_type":2,"reimb_percentage":0.5},{"actID":5,"policy_type":3,"reimb_percentage":0.2},{"actID":6,"policy_type":0,"reimb_percentage":1},{"actID":6,"policy_type":1,"reimb_percentage":0.8},{"actID":6,"policy_type":2,"reimb_percentage":0.5},{"actID":6,"policy_type":3,"reimb_percentage":0.2}]
},{}],3:[function(require,module,exports){
module.exports=[{"actID":0,"name":"consulta","cost":50},{"actID":1,"name":"raio-X","cost":100},{"actID":2,"name":"tomografia","cost":150},{"actID":3,"name":"exame","cost":75},{"actID":4,"name":"cirurgia","cost":5000},{"actID":5,"name":"transfusão","cost":1000},{"actID":6,"name":"ecograma","cost":200}]
},{}],4:[function(require,module,exports){
module.exports=[{"docID":0,"name":"Leonor Pereira","speciality":"Clínica Geral","user":"doc0","pass":"pass"},{"docID":1,"name":"João Santos","speciality":"Ortopedia","user":"doc1","pass":"pass"},{"docID":2,"name":"Guilherme Silva","speciality":"Neurocirurgia","user":"doc2","pass":"pass"},{"docID":3,"name":"Francisco Martins","speciality":"Pediatria","user":"doc3","pass":"pass"},{"docID":4,"name":"Leonor Ferreira","speciality":"Ortopedia","user":"doc4","pass":"pass"},{"docID":5,"name":"Matilde Santos","speciality":"Cardiologia","user":"doc5","pass":"pass"},{"docID":6,"name":"Mariana Silva","speciality":"Psiquiatria","user":"doc6","pass":"pass"},{"docID":7,"name":"Tomás Martins","speciality":"Pediatria","user":"doc7","pass":"pass"},{"docID":8,"name":"Matilde Ferreira","speciality":"Clínica Geral","user":"doc8","pass":"pass"},{"docID":9,"name":"Leonor Santos","speciality":"Neurocirurgia","user":"doc9","pass":"pass"}]
},{}],5:[function(require,module,exports){
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

},{"./acts-rmb.json":2,"./acts.json":3,"./doctors.json":4,"./patients.json":6,"./reports.json":7,"./requests.json":8,"fs":1}],6:[function(require,module,exports){
module.exports=[{"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0},{"patID":1,"name":"Tomás Santos","policy_number":1001,"policy_type":2},{"patID":2,"name":"Francisco Santos","policy_number":1002,"policy_type":1},{"patID":3,"name":"Mariana Pereira","policy_number":1003,"policy_type":2},{"patID":4,"name":"Leonor Oliveira","policy_number":1004,"policy_type":0},{"patID":5,"name":"Santiago Ferreira","policy_number":1005,"policy_type":1},{"patID":6,"name":"Rodrigo Silva","policy_number":1006,"policy_type":1},{"patID":7,"name":"João Martins","policy_number":1007,"policy_type":2},{"patID":8,"name":"Carolina Ferreira","policy_number":1008,"policy_type":0},{"patID":9,"name":"Beatriz Santos","policy_number":1009,"policy_type":2},{"patID":10,"name":"Leonor Costa","policy_number":1010,"policy_type":2},{"patID":11,"name":"Maria Ferreira","policy_number":1011,"policy_type":0},{"patID":12,"name":"Leonor Pereira","policy_number":1012,"policy_type":0},{"patID":13,"name":"Leonor Costa","policy_number":1013,"policy_type":0},{"patID":14,"name":"Tomás Ferreira","policy_number":1014,"policy_type":1},{"patID":15,"name":"João Martins","policy_number":1015,"policy_type":2},{"patID":16,"name":"Rodrigo Costa","policy_number":1016,"policy_type":3},{"patID":17,"name":"Matilde Silva","policy_number":1017,"policy_type":0},{"patID":18,"name":"Beatriz Pereira","policy_number":1018,"policy_type":0},{"patID":19,"name":"Guilherme Oliveira","policy_number":1019,"policy_type":2}]
},{}],7:[function(require,module,exports){
module.exports=[{"repID":0,"date":"24/12/2008","docID":5,"patID":0,"actID":4,"actual_reimb_perc":0.5},
{"repID":1,"date":"15/9/2002","docID":3,"patID":0,"actID":1,"actual_reimb_perc":0.5},
{"repID":2,"date":"24/8/2003","docID":8,"patID":0,"actID":3,"actual_reimb_perc":0.5},
{"repID":3,"date":"24/8/2013","docID":7,"patID":0,"actID":6,"actual_reimb_perc":0.5},
{"repID":4,"date":"6/3/2009","docID":0,"patID":0,"actID":6,"actual_reimb_perc":0.5},
{"repID":5,"date":"29/10/2015","docID":1,"patID":1,"actID":2,"actual_reimb_perc":0.2},
{"repID":6,"date":"23/9/2001","docID":5,"patID":1,"actID":4,"actual_reimb_perc":0.2},
{"repID":7,"date":"3/5/2004","docID":9,"patID":1,"actID":6,"actual_reimb_perc":0.2},
{"repID":8,"date":"18/9/2011","docID":7,"patID":1,"actID":4,"actual_reimb_perc":0.2},
{"repID":9,"date":"9/2/2009","docID":4,"patID":1,"actID":4,"actual_reimb_perc":0.2},
{"repID":10,"date":"16/5/2003","docID":8,"patID":2,"actID":2,"actual_reimb_perc":1},
{"repID":11,"date":"11/3/2002","docID":1,"patID":2,"actID":5,"actual_reimb_perc":1},
{"repID":12,"date":"14/11/2015","docID":8,"patID":2,"actID":2,"actual_reimb_perc":1},
{"repID":13,"date":"9/3/2011","docID":9,"patID":2,"actID":2,"actual_reimb_perc":1},
{"repID":14,"date":"17/4/2010","docID":0,"patID":2,"actID":6,"actual_reimb_perc":1},
{"repID":15,"date":"2/11/2014","docID":5,"patID":3,"actID":4,"actual_reimb_perc":0.5},
{"repID":16,"date":"10/11/2001","docID":1,"patID":3,"actID":3,"actual_reimb_perc":0.5},
{"repID":17,"date":"16/9/2005","docID":7,"patID":3,"actID":2,"actual_reimb_perc":0.5},
{"repID":18,"date":"2/10/2012","docID":1,"patID":3,"actID":4,"actual_reimb_perc":0.5},
{"repID":19,"date":"6/12/2003","docID":7,"patID":3,"actID":4,"actual_reimb_perc":0.5},
{"repID":20,"date":"15/4/2003","docID":3,"patID":4,"actID":2,"actual_reimb_perc":0.5},
{"repID":21,"date":"23/2/2013","docID":0,"patID":4,"actID":5,"actual_reimb_perc":0.5},
{"repID":22,"date":"8/9/2006","docID":5,"patID":4,"actID":3,"actual_reimb_perc":0.5},
{"repID":23,"date":"7/2/2013","docID":8,"patID":4,"actID":0,"actual_reimb_perc":0.5},
{"repID":24,"date":"5/5/2010","docID":2,"patID":4,"actID":1,"actual_reimb_perc":0.5},
{"repID":25,"date":"21/11/2013","docID":7,"patID":5,"actID":1,"actual_reimb_perc":0.2},
{"repID":26,"date":"14/9/2009","docID":0,"patID":5,"actID":5,"actual_reimb_perc":0.2},
{"repID":27,"date":"28/6/2003","docID":1,"patID":5,"actID":1,"actual_reimb_perc":0.2},
{"repID":28,"date":"18/8/2009","docID":1,"patID":5,"actID":4,"actual_reimb_perc":0.2},
{"repID":29,"date":"11/7/2002","docID":4,"patID":5,"actID":2,"actual_reimb_perc":0.2},
{"repID":30,"date":"8/5/2012","docID":6,"patID":6,"actID":0,"actual_reimb_perc":0.2},
{"repID":31,"date":"10/11/2011","docID":5,"patID":6,"actID":6,"actual_reimb_perc":0.2},
{"repID":32,"date":"5/1/2005","docID":8,"patID":6,"actID":1,"actual_reimb_perc":0.2},
{"repID":33,"date":"15/11/2008","docID":5,"patID":6,"actID":0,"actual_reimb_perc":0.2},
{"repID":34,"date":"14/5/2001","docID":6,"patID":6,"actID":4,"actual_reimb_perc":0.2},
{"repID":35,"date":"2/9/2011","docID":0,"patID":7,"actID":1,"actual_reimb_perc":0.8},
{"repID":36,"date":"20/4/2011","docID":3,"patID":7,"actID":5,"actual_reimb_perc":0.8},
{"repID":37,"date":"2/5/2013","docID":9,"patID":7,"actID":5,"actual_reimb_perc":0.8},{"repID":38,"date":"3/1/2004","docID":8,"patID":7,"actID":2,"actual_reimb_perc":0.8},{"repID":39,"date":"13/12/2011","docID":8,"patID":7,"actID":5,"actual_reimb_perc":0.8},{"repID":40,"date":"18/6/2010","docID":0,"patID":8,"actID":3,"actual_reimb_perc":0.8},{"repID":41,"date":"27/9/2005","docID":6,"patID":8,"actID":4,"actual_reimb_perc":0.8},{"repID":42,"date":"13/9/2005","docID":4,"patID":8,"actID":4,"actual_reimb_perc":0.8},{"repID":43,"date":"14/12/2006","docID":9,"patID":8,"actID":6,"actual_reimb_perc":0.8},{"repID":44,"date":"28/8/2008","docID":7,"patID":8,"actID":0,"actual_reimb_perc":0.8},{"repID":45,"date":"18/4/2007","docID":0,"patID":9,"actID":1,"actual_reimb_perc":1},{"repID":46,"date":"8/10/2012","docID":4,"patID":9,"actID":5,"actual_reimb_perc":1},{"repID":47,"date":"14/6/2007","docID":3,"patID":9,"actID":4,"actual_reimb_perc":1},{"repID":48,"date":"2/1/2013","docID":5,"patID":9,"actID":4,"actual_reimb_perc":1},{"repID":49,"date":"18/6/2001","docID":6,"patID":9,"actID":0,"actual_reimb_perc":1},{"repID":50,"date":"17/12/2009","docID":5,"patID":10,"actID":4,"actual_reimb_perc":0.8},{"repID":51,"date":"13/8/2003","docID":0,"patID":10,"actID":0,"actual_reimb_perc":0.8},{"repID":52,"date":"13/3/2001","docID":6,"patID":10,"actID":4,"actual_reimb_perc":0.8},{"repID":53,"date":"23/12/2011","docID":6,"patID":10,"actID":5,"actual_reimb_perc":0.8},{"repID":54,"date":"12/1/2005","docID":0,"patID":10,"actID":1,"actual_reimb_perc":0.8},{"repID":55,"date":"11/8/2015","docID":4,"patID":11,"actID":6,"actual_reimb_perc":0.5},{"repID":56,"date":"25/11/2005","docID":5,"patID":11,"actID":0,"actual_reimb_perc":0.5},{"repID":57,"date":"8/10/2009","docID":9,"patID":11,"actID":1,"actual_reimb_perc":0.5},{"repID":58,"date":"12/8/2014","docID":1,"patID":11,"actID":1,"actual_reimb_perc":0.5},{"repID":59,"date":"15/4/2003","docID":3,"patID":11,"actID":0,"actual_reimb_perc":0.5},{"repID":60,"date":"17/4/2014","docID":3,"patID":12,"actID":3,"actual_reimb_perc":0.8},{"repID":61,"date":"15/6/2005","docID":6,"patID":12,"actID":5,"actual_reimb_perc":0.8},{"repID":62,"date":"7/12/2004","docID":2,"patID":12,"actID":3,"actual_reimb_perc":0.8},{"repID":63,"date":"22/11/2010","docID":8,"patID":12,"actID":0,"actual_reimb_perc":0.8},{"repID":64,"date":"19/2/2013","docID":8,"patID":12,"actID":0,"actual_reimb_perc":0.8},{"repID":65,"date":"21/8/2004","docID":0,"patID":13,"actID":4,"actual_reimb_perc":1},{"repID":66,"date":"8/2/2014","docID":4,"patID":13,"actID":3,"actual_reimb_perc":1},{"repID":67,"date":"24/2/2015","docID":5,"patID":13,"actID":3,"actual_reimb_perc":1},{"repID":68,"date":"7/6/2007","docID":7,"patID":13,"actID":4,"actual_reimb_perc":1},{"repID":69,"date":"14/5/2014","docID":1,"patID":13,"actID":0,"actual_reimb_perc":1},{"repID":70,"date":"28/3/2003","docID":2,"patID":14,"actID":0,"actual_reimb_perc":1},{"repID":71,"date":"7/3/2002","docID":4,"patID":14,"actID":6,"actual_reimb_perc":1},{"repID":72,"date":"19/9/2010","docID":7,"patID":14,"actID":0,"actual_reimb_perc":1},{"repID":73,"date":"21/11/2013","docID":6,"patID":14,"actID":5,"actual_reimb_perc":1},{"repID":74,"date":"14/9/2005","docID":7,"patID":14,"actID":0,"actual_reimb_perc":1},{"repID":75,"date":"18/6/2006","docID":2,"patID":15,"actID":3,"actual_reimb_perc":1},{"repID":76,"date":"27/2/2005","docID":4,"patID":15,"actID":1,"actual_reimb_perc":1},{"repID":77,"date":"6/8/2005","docID":8,"patID":15,"actID":5,"actual_reimb_perc":1},{"repID":78,"date":"6/8/2012","docID":1,"patID":15,"actID":3,"actual_reimb_perc":1},{"repID":79,"date":"12/12/2006","docID":2,"patID":15,"actID":2,"actual_reimb_perc":1},{"repID":80,"date":"22/8/2012","docID":4,"patID":16,"actID":0,"actual_reimb_perc":0.5},{"repID":81,"date":"26/8/2001","docID":2,"patID":16,"actID":1,"actual_reimb_perc":0.5},{"repID":82,"date":"6/6/2001","docID":8,"patID":16,"actID":6,"actual_reimb_perc":0.5},{"repID":83,"date":"19/5/2015","docID":6,"patID":16,"actID":1,"actual_reimb_perc":0.5},{"repID":84,"date":"7/12/2005","docID":8,"patID":16,"actID":1,"actual_reimb_perc":0.5},{"repID":85,"date":"6/6/2007","docID":5,"patID":17,"actID":0,"actual_reimb_perc":1},{"repID":86,"date":"2/5/2004","docID":5,"patID":17,"actID":0,"actual_reimb_perc":1},{"repID":87,"date":"8/9/2003","docID":9,"patID":17,"actID":1,"actual_reimb_perc":1},{"repID":88,"date":"28/9/2008","docID":0,"patID":17,"actID":0,"actual_reimb_perc":1},{"repID":89,"date":"7/6/2005","docID":8,"patID":17,"actID":5,"actual_reimb_perc":1},{"repID":90,"date":"24/2/2004","docID":2,"patID":18,"actID":1,"actual_reimb_perc":0.8},{"repID":91,"date":"15/3/2003","docID":4,"patID":18,"actID":2,"actual_reimb_perc":0.8},{"repID":92,"date":"5/5/2012","docID":1,"patID":18,"actID":1,"actual_reimb_perc":0.8},{"repID":93,"date":"20/1/2001","docID":3,"patID":18,"actID":4,"actual_reimb_perc":0.8},{"repID":94,"date":"11/4/2011","docID":2,"patID":18,"actID":3,"actual_reimb_perc":0.8},{"repID":95,"date":"14/1/2014","docID":1,"patID":19,"actID":5,"actual_reimb_perc":0.2},{"repID":96,"date":"28/6/2007","docID":7,"patID":19,"actID":6,"actual_reimb_perc":0.2},{"repID":97,"date":"13/11/2004","docID":1,"patID":19,"actID":4,"actual_reimb_perc":0.2},{"repID":98,"date":"23/7/2002","docID":1,"patID":19,"actID":6,"actual_reimb_perc":0.2},{"repID":99,"date":"6/1/2001","docID":4,"patID":19,"actID":1,"actual_reimb_perc":0.2}]
},{}],8:[function(require,module,exports){
module.exports=[{"reqID":0,"repID":99,"status":"REJECTED"},{"reqID":1,"repID":98,"status":"REQUESTED"},{"reqID":2,"repID":97,"status":"REJECTED"},{"reqID":3,"repID":96,"status":"PENDING"},{"reqID":4,"repID":95,"status":"ACCEPTED"},{"reqID":5,"repID":94,"status":"REQUESTED"},{"reqID":6,"repID":93,"status":"PENDING"},{"reqID":7,"repID":92,"status":"PENDING"},{"reqID":8,"repID":91,"status":"PENDING"},{"reqID":9,"repID":90,"status":"PENDING"},{"reqID":10,"repID":89,"status":"REQUESTED"},{"reqID":11,"repID":88,"status":"REQUESTED"},{"reqID":12,"repID":87,"status":"REQUESTED"},{"reqID":13,"repID":86,"status":"REQUESTED"},{"reqID":14,"repID":85,"status":"REQUESTED"},{"reqID":15,"repID":84,"status":"ACCEPTED"},{"reqID":16,"repID":83,"status":"PENDING"},{"reqID":17,"repID":82,"status":"PENDING"},{"reqID":18,"repID":81,"status":"REJECTED"},{"reqID":19,"repID":80,"status":"REQUESTED"},{"reqID":20,"repID":79,"status":"ACCEPTED"},{"reqID":21,"repID":78,"status":"PENDING"},{"reqID":22,"repID":77,"status":"PENDING"},{"reqID":23,"repID":76,"status":"ACCEPTED"},{"reqID":24,"repID":75,"status":"REJECTED"},{"reqID":25,"repID":74,"status":"REQUESTED"},{"reqID":26,"repID":73,"status":"ACCEPTED"},{"reqID":27,"repID":72,"status":"REJECTED"},{"reqID":28,"repID":71,"status":"REQUESTED"},{"reqID":29,"repID":70,"status":"REQUESTED"},{"reqID":30,"repID":69,"status":"ACCEPTED"},{"reqID":31,"repID":68,"status":"REJECTED"},{"reqID":32,"repID":67,"status":"REQUESTED"},{"reqID":33,"repID":66,"status":"PENDING"},{"reqID":34,"repID":65,"status":"ACCEPTED"},{"reqID":35,"repID":64,"status":"PENDING"},{"reqID":36,"repID":63,"status":"REJECTED"},{"reqID":37,"repID":62,"status":"ACCEPTED"},{"reqID":38,"repID":61,"status":"PENDING"},{"reqID":39,"repID":60,"status":"REQUESTED"},{"reqID":40,"repID":59,"status":"REJECTED"},{"reqID":41,"repID":58,"status":"REJECTED"},{"reqID":42,"repID":57,"status":"REJECTED"},{"reqID":43,"repID":56,"status":"REQUESTED"},{"reqID":44,"repID":55,"status":"REJECTED"},{"reqID":45,"repID":54,"status":"REQUESTED"},{"reqID":46,"repID":53,"status":"ACCEPTED"},{"reqID":47,"repID":52,"status":"ACCEPTED"},{"reqID":48,"repID":51,"status":"ACCEPTED"},{"reqID":49,"repID":50,"status":"PENDING"},{"reqID":50,"repID":49,"status":"REJECTED"},{"reqID":51,"repID":48,"status":"REQUESTED"},{"reqID":52,"repID":47,"status":"REQUESTED"},{"reqID":53,"repID":46,"status":"ACCEPTED"},{"reqID":54,"repID":45,"status":"PENDING"},{"reqID":55,"repID":44,"status":"PENDING"},{"reqID":56,"repID":43,"status":"REJECTED"},{"reqID":57,"repID":42,"status":"ACCEPTED"},{"reqID":58,"repID":41,"status":"ACCEPTED"},{"reqID":59,"repID":40,"status":"ACCEPTED"},{"reqID":60,"repID":39,"status":"ACCEPTED"},{"reqID":61,"repID":38,"status":"REJECTED"},{"reqID":62,"repID":37,"status":"ACCEPTED"},{"reqID":63,"repID":36,"status":"REQUESTED"},{"reqID":64,"repID":35,"status":"REQUESTED"},{"reqID":65,"repID":34,"status":"REJECTED"},{"reqID":66,"repID":33,"status":"ACCEPTED"},{"reqID":67,"repID":32,"status":"PENDING"},{"reqID":68,"repID":31,"status":"REJECTED"},{"reqID":69,"repID":30,"status":"REQUESTED"},{"reqID":70,"repID":29,"status":"REQUESTED"},{"reqID":71,"repID":28,"status":"REJECTED"},{"reqID":72,"repID":27,"status":"REJECTED"},{"reqID":73,"repID":26,"status":"REQUESTED"},{"reqID":74,"repID":25,"status":"ACCEPTED"},{"reqID":75,"repID":24,"status":"PENDING"},{"reqID":76,"repID":23,"status":"ACCEPTED"},{"reqID":77,"repID":22,"status":"ACCEPTED"},{"reqID":78,"repID":21,"status":"PENDING"},{"reqID":79,"repID":20,"status":"REJECTED"},{"reqID":80,"repID":19,"status":"PENDING"},{"reqID":81,"repID":18,"status":"REQUESTED"},{"reqID":82,"repID":17,"status":"REJECTED"},{"reqID":83,"repID":16,"status":"PENDING"},{"reqID":84,"repID":15,"status":"REQUESTED"},{"reqID":85,"repID":14,"status":"REQUESTED"},{"reqID":86,"repID":13,"status":"REQUESTED"},{"reqID":87,"repID":12,"status":"ACCEPTED"},{"reqID":88,"repID":11,"status":"ACCEPTED"},{"reqID":89,"repID":10,"status":"PENDING"},{"reqID":90,"repID":9,"status":"ACCEPTED"},{"reqID":91,"repID":8,"status":"REQUESTED"},{"reqID":92,"repID":7,"status":"REQUESTED"},{"reqID":93,"repID":6,"status":"ACCEPTED"},{"reqID":94,"repID":5,"status":"REJECTED"},{"reqID":95,"repID":4,"status":"PENDING"},{"reqID":96,"repID":3,"status":"REQUESTED"},{"reqID":97,"repID":2,"status":"REQUESTED"},{"reqID":98,"repID":1,"status":"ACCEPTED"},{"reqID":99,"repID":0,"status":"REQUESTED"}]
},{}]},{},[5])(5)
});