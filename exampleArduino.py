from socketIO_client import SocketIO
socketIO = SocketIO('ip für server mit ifconfig', 3001)
def on_checkbox_respone(*args): wa in fkt steht wird übergeben
	data = args [0];   
	print data ["value"]
socketIO.on('checkbox', on checkbox_response); statt on emit schreiben dann wirds losgeschickt
socketIO.wait()