var server = require('./../index.js')
var resources = require('./../resources')

server.route({
  method: 'GET',
  path: '/hello',
  handler: resources.hello.get
})

server.route({
  method: 'POST',
  path: '/hello',
  handler: resources.hello.post
})

server.route({
  method: 'POST',
  path: '/login',
  handler: resources.hello.login
})

server.route({
  method: 'GET',
  path: '/acts',
  handler: resources.hello.acts
})

server.route({
  method: 'GET',
  path: '/patients',
  handler: resources.hello.patient
})

server.route({
  method: 'GET',
  path: '/requests',
  handler: resources.hello.request
})

server.route({
  method: 'POST',
  path: '/actsPat',
  handler: resources.hello.actsPat
})

server.route({
  method: 'POST',
  path: '/save',
  handler: resources.hello.save
})

server.route({
  method: 'POST',
  path: '/delete',
  handler: resources.hello.delete
})
