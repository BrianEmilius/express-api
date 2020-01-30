var Asset = require("../models/asset.model");
var { join } = require("path");
var { unlinkSync } = require("fs");

async function createAsset(req, res, next) {
	try {
		let asset = await Asset.create({
			name: req.files.asset.name,
			url: "//localhost:1337/file-bucket/" + 
					req.files.asset.path.split("/").pop()
		});
		res.status(201).json(asset);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}
async function getAllAssets(req, res, next) {
	let assets = await Asset.findAll();
	res.json(assets);
}
async function getSingleAsset(req, res, next) {

}

async function deleteSingleAsset(req, res, next) {
	try {
		let asset = await Asset.findByPk(req.params.id);
		let filename = asset.url.split("/").pop();
		unlinkSync(join(__dirname, "..", "assets", filename));
		await Asset.destroy({
			where: {
				id: req.params.id
			}
		});
		res.status(200).end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createAsset,
	getSingleAsset,
	getAllAssets,
	deleteSingleAsset
};
