var {
	createAsset,
	getAllAssets,
	getSingleAsset,
	deleteSingleAsset } = require("../controllers/asset.controller");

module.exports = function(router) {
	router.post("/api/v1/assets", createAsset);
	router.get("/api/v1/assets", getAllAssets);
	router.get("/api/v1/assets/:id", getSingleAsset);
	router.delete("/api/v1/assets/:id", deleteSingleAsset);
};
