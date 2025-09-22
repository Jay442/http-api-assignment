const respondXML = (request, response, status, xml) => {
  response.writeHead(status, {
    'Content-Type': 'text/xml',
    'Content-Length': Buffer.byteLength(xml, 'utf8'),
  });

  response.write(xml);
  response.end();
};

const success = (request, response) => {
  const xml = '<response><message>This is a successful response</message></response>';
  respondXML(request, response, 200, xml);
};

const badRequest = (request, response, query) => {
  if (!query || !query.valid || query.valid !== 'true') {
    const xml = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, xml);
  }

  const xml = '<response><message>This request has the required parameters</message></response>';
  return respondXML(request, response, 200, xml);
};

const unauthorized = (request, response, query) => {
  if (!query || !query.loggedIn || query.loggedIn !== 'yes') {
    const xml = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, xml);
  }

  const xml = '<response><message>You have successfully viewed the content</message></response>';
  return respondXML(request, response, 200, xml);
};

const forbidden = (request, response) => {
  const xml = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';
  respondXML(request, response, 403, xml);
};

const internal = (request, response) => {
  const xml = '<response><message>Internal Server Error. Something went wrong</message><id>internal</id></response>';
  respondXML(request, response, 500, xml);
};

const notImplemented = (request, response) => {
  const xml = '<response><message>A server error occurred. Request not implemented</message><id>notImplemented</id></response>';
  respondXML(request, response, 501, xml);
};

const notFound = (request, response) => {
  const xml = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
  respondXML(request, response, 404, xml);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
