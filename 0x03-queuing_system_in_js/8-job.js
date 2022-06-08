import kue from 'kue';

const createPushNotificationsJobs = (jobs, queue) => {
    if(!jobs.isArray()){
	throw new Error('Jobs is not an array');
    }
    for (const j in jobs){
	const job =  queue.create('push_notification_code_3', j)
	      .save((error) => {
		  if(!error) console.log(`Notification job created: ${job.id}`);
	      });
	job.on('complete', () => console.log(`Notification job ${job.id} completed`));
	job.on('failed', (error) => console.log(`Notification job ${job.id} failed: ${error}`));
	job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`))
    }
}
