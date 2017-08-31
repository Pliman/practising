var express = require('express');
var app = express();
var multer = require('multer');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(getDownloadFolder()));
app.use(express.static(__dirname));

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		var stream = file.stream;

		var chunks = [];
		stream.on('data', function(chunk) {
			chunks.push(chunk);
		});
		stream.on('end', function() {
			var result = Buffer.concat(chunks);
			var base64Str = result.toString('base64');

			// TODO 获取正确的socket
			io.sockets.emit('imageMessage', {
				base64Str: base64Str,
				type: file.mimetype
			});
		});

		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	}
});

var upload = multer({storage: storage}).single('userImg');

app.post('/fileupload', function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}

		res.end("File is uploaded");
	});
});

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('messageFromWechat', function (data) {
		console.log(data);
		socket.broadcast.emit('messageToClient', data);
	});

	socket.on('messageFromClient', function (data) {
		socket.broadcast.emit('messageToWechat', {
			to: '文件传输助手',
			msg: data.msg
		});
	});

	socket.on('getMessageFromWechat', function (data) {
		socket.broadcast.emit('getMessageFromWechat', data);
	});

	socket.on('avatarLoaded', function (data) {
		socket.broadcast.emit('updateClientAvatar', data);
	});

	socket.on('imageMessageLoaded', function (data) {
		socket.broadcast.emit('updateClientImageMessage', data);
	});

	socket.on('reloadWechatContent', function (data) {
		socket.broadcast.emit('reloadContent', data);
	});

	socket.on('sendImageToWechat', function (data) {
		socket.broadcast.emit('client_send_to_wechat_image', {
			to: '文件传输助手',
			imgData: 'data:image/png;base64,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'
		});
	});
});

function getDownloadFolder() {
	return (process.platform == 'win32') ? (process.env.USERPROFILE + '/Downloads') :
	process.env.HOME + '/下载';
}

http.listen(3000, function () {
	console.log('listening on *:3000');
});
