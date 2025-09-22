const http = require('http');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  const { pathname } = parsedUrl;

  const queryParams = {};
  parsedUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const acceptHeader = request.headers.accept || 'application/json';
  const isXML = acceptHeader.includes('text/xml');
  const handler = isXML ? xmlHandler : jsonHandler;

  switch (pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      handler.success(request, response);
      break;
    case '/badRequest':
      handler.badRequest(request, response, queryParams);
      break;
    case '/unauthorized':
      handler.unauthorized(request, response, queryParams);
      break;
    case '/forbidden':
      handler.forbidden(request, response);
      break;
    case '/internal':
      handler.internal(request, response);
      break;
    case '/notImplemented':
      handler.notImplemented(request, response);
      break;
    default:
      handler.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
