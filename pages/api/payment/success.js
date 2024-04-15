export default function handler(req, response) {
    response.writeHead(302, {
        'Location': '/payment/success'
    });
    response.end();
}