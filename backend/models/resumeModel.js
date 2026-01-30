// import mongoose from "mongoose";

// const resumeSchema = new mongoose.Schema({
//   userId :{
//     typr: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required:true
//   },
//   title:{
//     type:String,
//     required:true
//   },
//   thumbnailLink: {
//     type:String
//   },
//   template: {
//     theme:String,
//     colorPalette: [String]
//   },
//   profileInfo: {
//     profilePreviewUrl:String,
//     fullName:String,
//     designation:String,
//     summary:String
//   },
//   contactInfo: {
//     email: String,
//     phone: String,
//     location: String,
//     github:String,
//     website:String
//   },

//   // WORK EXPERINCE
//   workExpreience: [
//     {
//       company:String,
//       role:String,
//       startDate:String,
//       endDate:String,
//       description:String,
//     },
//   ],
//   education:[
//     {
//       degree:String,
//       institution:String,
//       startDate:String,
//       endDate:String,
//     },
//   ],
//   skills:[
//     {
//       name:String,
//       progress:Number,
//     },
//   ],
//   projects:[
//     {
//       title:String,
//       description:String,
//       github:String,
//       liveDemo:String,
//     },
//   ],
//   certification:[
//     {
//       title:String,
//       issuer:String,
//       year:String,
//     },
//   ],
//   languages:[
//     {
//       name:String,
//       progress: Number,
//     },
//   ],
//   interests:[String],
// },
//   {
//     timestamps:{createdAt:"createdAt", updatedAt:"un+pdatedAt"}
//   }
// );

// export default mongoose.model("Resume",resumeSchema);


import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // ✅ must be a string matching your user model name
    required: true
  },
  title:{
    type:String,
    required:true
  },
  thumbnailLink: String,
  template: {
    theme:String,
    colorPalette: [String]
  },
  profileInfo: {
    profilePreviewUrl:String,
    fullName:String,
    designation:String,
    summary:String
  },
  contactInfo: {
    email: String,
    phone: String,
    location: String,
    github:String,
    website:String
  },
  //  WORK EXPERINCE
  workExpreience: [
    {
      company:String,
      role:String,
      startDate:String,
      endDate:String,
      description:String,
    },
  ],
  education:[
    {
      degree:String,
      institution:String,
      startDate:String,
      endDate:String,
    },
  ],
  skills:[
    {
      name:String,
      progress:Number,
    },
  ],
  projects:[
    {
      title:String,
      description:String,
      github:String,
      liveDemo:String,
    },
  ],
  certification:[
    {
      title:String,
      issuer:String,
      year:String,
    },
  ],
  languages:[
    {
      name:String,
      progress: Number,
    },
  ],
   interests:[String],
  // other fields...
}, { timestamps: {createdAt:"createAt",updatedAt:"updatedAt"} });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;

