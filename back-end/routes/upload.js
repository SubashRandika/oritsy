import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// This disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path
				.extname(file.originalname)
				.toLowerCase()}`
		);
	}
});

// This method checks for existence of image types of jpg and png with mimetype.
function checkFileType(file, cb) {
	const fileTypeRegex = /jpg|jpeg|png/;
	const isExtMatch = fileTypeRegex.test(
		path.extname(file.originalname).toLowerCase()
	);
	const isMimeTypeMatch = fileTypeRegex.test(file.mimetype);

	if (isExtMatch && isMimeTypeMatch) {
		return cb(null, true);
	} else {
		cb('Only JPEG and PNG images supported');
	}
}

const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		checkFileType(file, cb);
	}
});

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
