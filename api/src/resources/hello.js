var bl = require('../../../bl/src')

exports = module.exports

exports.get = function handler (request, reply) {
  reply(bl.sayHello())
}

exports.post = function handler (request, reply) {
  reply(bl.sayHello(request.payload.name))
}

exports.login = function handler (request, reply) {
  reply(bl.login(request.payload.usr,request.payload.password))
}

exports.patient = function handler (request, reply) {
  reply(bl.patient())
}

exports.acts = function handler (request, reply) {
  reply(bl.acts())
}

exports.request = function handler (request, reply) {
  reply(bl.request())
}

exports.actsPat = function handler (request,reply){
  reply(bl.actsPat(request.payload.patientID,request.payload.policyType))
}

exports.save = function handler (request,reply){
  reply(bl.save(request.payload.docid,request.payload.acttype,request.payload.patientId,request.payload.poltype))
}

exports.delete = function handler (request,reply){
  reply(bl.delete(request.payload.reportID,request.payload.patientID,request.payload.poltype))
}
