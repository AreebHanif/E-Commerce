import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // ✅ Fixed here
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetypes = /image\/jpeg|image\/jpg|image\/png/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (fileTypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
};

const upload = multer({ storage, fileFilter }); // ✅ Fixed here
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message });
        } else if (req.file) {
            res.status(200).send({
                message: "Image Uploaded successfully",
                image: `${req.file.path}`
            });
        } else {
            res.status(400).send({ message: "Image not provided" });
        }
    });
});

export default router;
