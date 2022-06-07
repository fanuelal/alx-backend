import redis from 'redis';
import { createClient } from 'redis';

const client = createClient();

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

function displaySchoolValue(schoolName){
    const val = client.get(schoolName, (err, conf) => {
	console.log(conf);
    });
    console.log(val);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
