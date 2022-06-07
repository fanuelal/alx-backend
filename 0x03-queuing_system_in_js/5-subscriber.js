import redis from 'redis';
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
    if (err) console.log(`Redis client not connected to the server: ${err}`);
         }).on('ready', () => {
             console.log('Redis client connected to the server');
	 });

client.subscribe("holberton school channel");

client.on('message', (channel, message) => {
    console.log(message);
    if (message === 'KILL_SERVER'){
	client.unsubscribe(channel);
	process.exit(0);
    }
});
