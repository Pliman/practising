var express = require('express')
var multipart = require('connect-multiparty')
var _ = require('underscore')
var path = require('path')
var app = express()

var config = {
	uploadDir: './uploads'
}

app.use(multipart(config))

app.use(express.static('./'))

app.get('/', function (req, res) {
	res.send('Hello World')
})

app.post('/api/upload', function (req, res, next) {
	var data = _.pick(req.body, 'type'),
		type = req.files.file.type,
		uploadPath = path.normalize(config.uploadDir),
		file = req.files.file

	console.log(data)
	console.log(type)
	console.log(file.name) //original name (ie: sunset.png)
	console.log(file.path) //tmp path (ie: /tmp/12345-xyaz.png)
	console.log(uploadPath) //uploads directory: (ie: /home/user/data/uploads)

	res.send({code: 0, msg: 'success', data: file.path});
})

app.listen(3000)
