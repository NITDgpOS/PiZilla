import { dirname } from 'path';

export const config = {
    deadline: 24, // hours beyond which a file is deleted
    deleteSchedule: '00 00 */2 * * *', // runs the check once every two hours
    port: 8000,
    root: dirname(__dirname),
    uploads: 'uploads',
};
