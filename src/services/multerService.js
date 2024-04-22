const multer = require("multer");

const mimeType = ["image/jpg", "image/jpeg", "image/png"];

const upload = function (storagePath) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, storagePath); // Use the provided storage path
        },
        filename: function (req, file, cb) {
            const fileName = Date.now() + file.originalname.replace(/ /g, "_");
            cb(null, fileName);
        },
    });

    const fileFilter = function (req, file, cb) {
        if (!mimeType.includes(file.mimetype)) {
            req.errorMulter =
                "Seulement les fichiers d'images au format suivants sont autorisés ! (jpg,jpeg,png)";
            cb(null, false);
        } else {
            cb(null, true);
        }
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
    });
};

module.exports = upload;
