const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const shevchenko = require("shevchenko");
const PORT = process.env.PORT || 80;

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const headers = req.headers;
  const queryString = parsedUrl.query;

  const decoder = new StringDecoder("utf-8");

  let buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    const data = { path, method, headers, queryString, payload: buffer };

    const chosenHandler = handlers[path] || handlers.notFound;

    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = typeof payload == "object" ? payload : {};
      const resPayloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(resPayloadString);
      console.log("Returning response:", statusCode, payload);
    });
  });
});

const handlers = {};

handlers.api = function (data, cb) {
  const payloads = JSON.parse(data.payload);
  if (Array.isArray(payloads)) {
    const response = payloads.map((payload) => {
      const { inflect } = payload;
      delete payload.inflect;
      const inflected = shevchenko[inflect](payload);
      return { ...inflected, inflect };
    });
    cb(200, response);
  } else {
    cb(400, { message: "Bad Request payload must be an array" });
  }
};

handlers.notFound = function (data, cb) {
  cb(404);
};

server.listen(PORT, function () {
  console.log("The Shevchenko service listening on port:", PORT);
});
