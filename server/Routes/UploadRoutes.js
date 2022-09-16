import express from "express";
import cloudinary from "cloudinary";
const router = express.Router();
import multer from "multer";
cloudinary.config({
  cloud_name: "dbgniwcjt",
  api_key: "755397456541872",
  api_secret: "ehBjKKwQ0YWLrCVRq39Sn991VpM",
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

// const uploadFile = (file) => {
//   cloudinary.v2.uploader.upload(
//     file,
//     { public_id: file.name},
//     function (error, result) {
//       console.log(result);
//     }
//   );
// };

router.post(
  "/",
  upload.single("file", (req, res) => {
    try {
      res.status(200).json("File Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  })
);

// router.post("/",uploadFile())

export default router;
