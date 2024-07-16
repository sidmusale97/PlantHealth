import { createClient } from 'redis';

const client = createClient({
    password: 'zYPyG5QVcTxOUZDKcig02aex4V1Kobu3',
    socket: {
        host: 'redis-18401.c91.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 18401
    }
});

export function(sensor_id: number}) {
    
}