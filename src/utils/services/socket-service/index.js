import { io } from 'socket.io-client';
import { api_urls } from '../../api-urls';
import * as ChatActions from '../../../redux/actions/chatAction';
import * as CommonActions from '../../../redux/actions/commonAction';
import { replace } from 'react-router-dom';
const SOCKET_URL = api_urls;

class SocketService {

    static initializeSocket = async (dispatch, navigate, userId) => {
        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                query: { userId },
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
            });

            this.socket.on('connect', () => {
                console.log('Connected to server with socket ID:', this.socket.id);
                dispatch(CommonActions?.setSocketConnectionStatus(true));
            });

            this.socket.on('disconnect', reason => {
                console.log('Disconnected from server:', reason);
                dispatch(CommonActions?.setSocketConnectionStatus(false));
                if (reason === 'io server disconnect') {
                    //? The disconnection was initiated by the server, you need to reconnect manually
                    this.socket.connect();
                }
            });

            this.socket.on('reconnect_attempt', () => {
                console.log('Attempting to reconnect...');
            });

            this.socket.on('reconnect_error', (error) => {
                console.log('Reconnection error:', error);
            });

            this.socket.on('reconnect_failed', () => {
                console.log('Reconnection failed');
            });

            this.socket.on('new_customer_login', data => {
                console.log('new_customer_login Socket', data)
            })

            this.socket.on('new_astrologer_login', data => {
                console.log('new_astrologer_login Socket', data)
            })

            this.socket.on('onChatReject', data => {
                // resetToScreen('home')
                // showToastMessage({ message: 'Chat not conected' })
            });

            this.socket.on('updateChatTimer', data => {
                // console.log("Timer Data ::: ", data);
                dispatch(ChatActions.setChatTimerCountdown(data));
            });

            this.socket.on('timerStopped', data => {
                console.log('timerStopped Socket runnnnn......................', data);
                dispatch(ChatActions.closeChatMessage({ onComplete: () => navigate('/', { replace: true }) }));
                // window.location.replace('/')
            });

            this.socket.on('chatEnded', data => {
                console.log('chatEnded Socket Not runnnnn......................')
                // dispatch(ChatActions.onCloseChat());
            });

            this.socket.on('walletAlert', data => {
                console.log('walletAlert Socket', data)
                //? dispatch(ChatActions.setChatWalletAlert(data))
            })

            this.socket.on('error', data => {
                console.log('Socket Error', data);
            });
        } catch (e) {
            console.log('socket is not initilized', e);
        }
    };

    static emit(event, data = {}) {
        console.log("Inside Socket")
        if (this.socket && this.socket.connected) {
            console.log("Socket Connected")
            console.log('Emitting event:', event, 'with data:', data);
            this.socket.emit(event, data);
        } else {
            console.error('Socket is not connected. Cannot emit event:', event);
        }
    }

    static removeListener(listenerName) {
        this.socket.removeAllListeners(listenerName);
    }
}

export default SocketService;