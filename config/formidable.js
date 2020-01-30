var formidable = require("express-formidable");
var { join } = require("path");

module.exports = formidable({
	uploadDir: join(__dirname, "..", "assets"),
	encoding: "utf-8",
	multiples: true,
	keepExtensions: true
});
