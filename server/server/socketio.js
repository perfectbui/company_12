const { moveToHeaderArray } = require('./lib/utils');
const _ = require('lodash');
const Common = require('./models/Common');
const { commonEmitter } = require('./config/emitter');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

var listUser = [];

async function initializeListUser(userOnline, socket) {
	let listUser = await User.find({}, 'name username avatar lastActive');
	listUser = JSON.parse(JSON.stringify(listUser));

	for (let user of listUser) {
		if (user._id === userOnline._id) {
			user.isOnline = true;
			user.socketId = socket.id;
			moveToHeaderArray(listUser, user);
		} else {
			user.isOnline = false;
		}
	}
	return listUser;
}

function addUserOnline(userOnline, socket) {
	const listUserCopy = listUser.slice();

	for (let i = 0; i < listUserCopy.length; i++) {
		if (listUserCopy[i]._id === userOnline._id) {
			listUserCopy[i].isOnline = true;
			listUserCopy[i].socketId = socket.id;
			moveToHeaderArray(listUserCopy, listUserCopy[i]);
			break;
		}
	}

	return listUserCopy;
}

async function removeUserOffline(socket) {
	const listUserCopy = listUser.slice();

	let idUserOffline;
	for (let i = 0; i < listUserCopy.length; i++) {
		if (listUserCopy[i].socketId === socket.id) {
			idUserOffline = listUserCopy[i]._id;
			listUserCopy[i].isOnline = false;
			listUserCopy[i].socketId = null;
			listUserCopy[i].lastActive = Date.now();
			break;
		}
	}

	await User.findByIdAndUpdate(idUserOffline, {
		$set: {
			lastActive: Date.now(),
		},
	});

	return listUserCopy;
}

module.exports = function (io) {
	io.on('connection', async (socket) => {
		const cookies = cookie.parse(socket.handshake.headers.cookie);

		const fullJwt = cookies.headerAndPayload + '.' + cookies.signature;

		const userOnline = await jwt.verify(fullJwt, process.env.SECRET_KEY);

		if (_.isEmpty(listUser)) {
			listUser = await initializeListUser(userOnline, socket);
		} else {
			listUser = addUserOnline(userOnline, socket);
		}

		io.emit('changedListUser', listUser);

		socket.on('disconnect', async () => {
			listUser = await removeUserOffline(socket);

			socket.broadcast.emit('coNguoiOffline', listUser);
		});
	});

	/* commonEmitter.on('coNguoiDangKy', async ({
        _id,
        name,
        avatar
    }) => {

        if (_.isEmpty(listUser)) {
            listUser = await User.find({}, 'name avatar');
            listUser = JSON.parse(JSON.stringify(listUser));
            listUser.forEach((user) => {
                if (user._id === idUserOnline) {
                    user.isOnline = true;
                    user.socketId = socket.id;
                    moveToHeaderArray(listUser, user);
                } else {
                    user.isOnline = false;
                }
            })
        } else {
            const newUser = {
                _id: _id.toString(),
                name,
                avatar,
                isOnline: false
            }
            listUser.push(newUser);
        }
        io.emit('coNguoiOnline', listUser);
    })

    commonEmitter.on('coNguoiThayAvatar', ({
        _id,
        avatar
    }) => {
        for (let i = 0; i < listUser.length; i++) {
            if (listUser[i]._id === _id) {
                listUser[i].avatar = avatar;
                break;
            }
        }
        io.emit('coNguoiOnline', listUser);
    })


    io.on('connection', (socket) => {
        socket.on('taoOnlineNe', async (idUserOnline) => {

            if (_.isEmpty(listUser)) {
                listUser = await User.find({}, 'name avatar lastActive');
                listUser = JSON.parse(JSON.stringify(listUser));
                listUser.forEach((user) => {
                    if (user._id === idUserOnline) {
                        user.isOnline = true;
                        user.socketId = socket.id;
                        moveToHeaderArray(listUser, user);
                    } else {
                        user.isOnline = false;
                    }
                })
            } else {
                for (let i = 0; i < listUser.length; i++) {
                    if (listUser[i]._id === idUserOnline) {
                        listUser[i].isOnline = true;
                        listUser[i].socketId = socket.id;
                        moveToHeaderArray(listUser, listUser[i]);
                        break;
                    }
                }
            }
            io.emit('coNguoiOnline', listUser);
        })

        socket.on('taoOfflineNe', async (idUserOffline) => {
            for (let i = 0; i < listUser.length; i++) {
                if (listUser[i]._id === idUserOffline) {
                    listUser[i].isOnline = false;
                    listUser[i].socketId = null;
                    listUser[i].lastActive = Date.now();
                    break;
                }
            }
            socket.broadcast.emit('coNguoiOffline', listUser);
            await User.findByIdAndUpdate(idUserOffline, {
                $set: {
                    lastActive: Date.now()
                }
            })


        })

        socket.on('disconnect', async () => {
            let idUserOffline;
            for (let i = 0; i < listUser.length; i++) {
                if (listUser[i].socketId === socket.id) {
                    idUserOffline = listUser[i]._id;
                    listUser[i].isOnline = false;
                    listUser[i].socketId = null;
                    listUser[i].lastActive = Date.now();
                    break;
                }
            }
            socket.broadcast.emit('coNguoiOffline', listUser);
            await User.findByIdAndUpdate(idUserOffline, {
                $set: {
                    lastActive: Date.now()
                }
            })
        })

        socket.on('sendMessage', (message) => {
            const {
                idSend,
                content,
                socketId,
                idNewMessage
            } = message;



            io.to(socketId).emit('coTinNhanMoi', {
                idSend,
                content,
                idNewMessage
            });
        })
    }) */
};
