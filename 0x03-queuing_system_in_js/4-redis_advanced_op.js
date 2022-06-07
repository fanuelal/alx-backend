import redis from 'redis';
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
    if (err) console.log(`Redis client not connected to the server: ${err}`)
  }).on('ready', () => {
      console.log('Redis client connected to the server');
  });

const key = 'HolbertonSchools';
const values = {'Portland':50,
	     'Seattle': 80,
	     'New York': 20,
	     'Bogota': 20,
	     'Cali': 40,
	     'Paris': 2
	       }

for (const[k, v] of Object.entries(values)){
    client.hset(key, k, v, (error, conf) =>
		redis.print((`confirmation: ${conf}`)));
}

client.hgetall(key, (error, obj) => console.log(obj));
