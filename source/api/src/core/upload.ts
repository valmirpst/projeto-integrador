import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "public/images/");
  },
  filename: (_, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const ext = path.extname(file.originalname); // .png, .jpg, etc.

    const fileName = `${timestamp}${ext}`;

    cb(null, fileName);
  },
});

const fileFilter = (_: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas arquivos de imagem são permitidos!"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
