var socket;

// client-side
if (window.location.pathname === '/chat') {
    socket = io('http://localhost:3000');

    /**
     * @listing from server
     * when new user joins
     * @gets {data}
     *  */
    socket.on('user_connect', async(user) => {
        // update view
        // online_user_container[0].innerHTML += USER_ELEMENT(user);
    });

    /**
     * @sending to server
     * new messages
     * need to send user_id whom you wanna send msg
     */
    $('.msg-send-button').click(() => {
        const MSG = $('.msg-input').val();
        if (MSG == "")
            return;
        const TO_USER = middleHeader[1].id;

        middleMain.innerHTML += RECIVED_MSG(MSG_LOADER);

        socket.emit('SENT_MSG', TO_USER, MSG, (success) => {
            if (success) {
                middleMain.lastChild.innerHTML = MSG;
            } else {
                middleMain.lastChild.remove();
                middleMain.innerHTML += INFO('message could not be sent try again!!!');
            }

            var elem = document.getElementById('middle-msg-container');
            elem.scrollTop = elem.scrollHeight;
        });
    });


    /**
     * @listening from server
     * new messages
     * need to send user_id whom you wanna send msg
     */
    socket.on('DELIVER_MSG', (MSG) => {
        middleMain.innerHTML += SENT_MSG(MSG);

        var elem = document.getElementById('middle-msg-container');
        elem.scrollTop = elem.scrollHeight;
    });


    /**
     * @listing from server
     * when user disconnects
     * @gets {user_id}
     *  */
    socket.on('user_disconnect', (user_id) => {
        // update views
        $(`#${user_id}`).parent().remove();
    });

    // File Sharing
    // socket.on('base64 file', function (msg) {
    //   console.log('received base64 file from' + msg.username);
    //   socket.username = msg.username;
    //   // socket.broadcast.emit('base64 image', //exclude sender
    //   io.sockets.emit('base64 file',  //include sender

    //       {
    //         username: socket.username,
    //         file: msg.file,
    //         fileName: msg.fileName
    //       }

    //   );
    // });

}