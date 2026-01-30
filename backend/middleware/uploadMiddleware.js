import multer from 'multer'

const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"uploads/")
  },
  filename:(req,file,cb) => {
    cb(nill, `${Date.now() }- ${file.originalname}`);
  }
});

// FILE FILTER
const fileFilter = (req,file,cb) => {
  const allowedTypes = ["images/jpeg", "image/png", "image/jpg"];
  if(allowedTypes.includes(file.mimetype)){
    cb(null,true)
  }
  else{
    cb(new Error('Only .jpeg, .jpg, .png are allowed formates'),false)
  }
};

const upload = multer({storage,fileFilter})
export default upload;