const http = require("http");
import { parse } from "querystring";

const PORT = 8080;

let products = [
  { id: 1, title: "iphone", price: 200 },
  { id: 2, title: "iphone 15", price: 3000 },
];

const errorResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: message,
    })
  );
};

const successResponse = (res, statusCode, message, payload = {}) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: message,
      payload: payload,
    })
  );
};

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    try {
      successResponse(res, 200, "hello world");
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else if (req.url === "/products" && req.method === "GET") {
    try {
      successResponse(res, 200, "returned all the products", products);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url?.split("/")[2];
      const product = products.find((prodct) => prodct.id === id);
      if (!product) {
        errorResponse(res, 404, "product not found with this id ${id}");
        return;
      }
      successResponse(res, 200, "returned  single product", product);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else if (req.url.match(/\/products\/[0-9]+)/) && req.method === "Delete") {
    try {
      const id = req.url?.split("/")[2];
      const product = products.find((prodct) => prodct.id === id);
      if (!product) {
        errorResponse(res, 404, "product not found with this id ${id}");
        return;
      }
      const filteredProducts = products.filter((product) => product.id !== id);
      products = filteredProducts;
      successResponse(res, 200, "deleted single product");
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else if (req.url === "/products" && req.method === "Post") {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body = body + chunk;
      });
      req.on("end", () => {
        const data = parse(body);
        if (String(updateData.title)) {
          product.title = String(updatedData.title);
        }
        if (Number(updatedData.price)) {
          products.price = Number(updatedData.price);
        }
        successResponse(res, 200, "product is update", product);
      });
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }

  server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  });
});
