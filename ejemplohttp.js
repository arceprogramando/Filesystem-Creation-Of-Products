import { createServer } from 'http';

const server = createServer((req, res) => {
    res.end('Mi primer hola mundo desde backend');

})

server.listen(8080, () => {
    console.log('Listening on port 8080');
})
asdsasad