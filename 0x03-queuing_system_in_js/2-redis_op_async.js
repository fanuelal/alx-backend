import redis from 'redis';
import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();
const cGet = promisify(client.get).bind(client);
client.on('error', (err) => {
    if (err) console.log(`Redis client not connected to the server: ${err}`);
         }).on('ready', () => {
             console.log('Redis client connected to the server');
});


function setNewSchool(schoolName, value){
    client.set(schoolName, value, (err, conf) => {
        redis.print('confirm: '.concat(conf));
    });
}

const displaySchoolValue = async(schoolName) => {
    const val = await cGet(schoolName);
    console.log(val);
}
(async() => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();
