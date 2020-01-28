var {
	getAllProducts,
	getSingleProduct,
	createProduct,
	deleteProduct,
	updateProduct
} = require("../controllers/product.controller");

module.exports = function(router) {
	router.get("/v1/products", getAllProducts);
	router.get("/v1/products/:id", getSingleProduct);
	router.post("/v1/products", createProduct);
	router.delete("/v1/products/:id", deleteProduct);
	router.put("/v1/products/:id", updateProduct);
};
