import SocketIO from 'socket.io';
import { lookup } from 'dns/promises';
import log from '../utils/log';
import { setTimeout } from 'timers/promises';

let isOnline = false;
let currentTimeout: AbortController;

const hasInternet = async () => {
  try {
    await lookup('arena.utt.fr');
    return true;
  } catch (error) {
    return error.code === 'ENOTFOUND';
  }
};

const runInternetCheck = async (io: SocketIO.Server) => {
  const online = await hasInternet();
  if (online !== isOnline) {
    isOnline = online;
    return notifyNetworkStatusChanged(io, isOnline);
  }
};

export const monitorInternetConnection = async (io: SocketIO.Server): Promise<void> => {
  currentTimeout = new AbortController();
  currentTimeout.signal.onabort = () => monitorInternetConnection(io);
  try {
    await setTimeout(Number(process.env.INTERNET_CHECK_TIMEOUT) || 30000, null, currentTimeout);
    await runInternetCheck(io);
    return monitorInternetConnection(io);
  } catch {}
};

export const notifyRequestReceived = (io: SocketIO.Server) => {
  if (!isOnline) {
    isOnline = true;
    notifyNetworkStatusChanged(io, isOnline);
    currentTimeout.abort();
  }
};

export const getCurrentInternetStatus = () => isOnline;

const notifyNetworkStatusChanged = async (io: SocketIO.Server, online: boolean) => {
  log.info('Socket emit: networkStatus');
  io.sockets.emit('networkStatus', { online });
};

// Initialize value
hasInternet().then((value) => (isOnline = value));
