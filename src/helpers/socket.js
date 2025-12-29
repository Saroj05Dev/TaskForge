import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3200"

export const socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false
});