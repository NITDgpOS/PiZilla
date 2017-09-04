import path from 'path';

const config = {
    deadline: 24, // hours beyond which a file is deleted
    deleteSchedule: '00 00 */2 * * *', // runs the check once every two hours
    port: 80,
    root: path.dirname(__dirname),
    uploads: 'uploads'
};

export default config;
