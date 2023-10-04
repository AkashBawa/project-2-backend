// import { Schema, Model, model, mongoose } from "mongoose";

// const ElderlySchema = new Schema(
//   {
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "user",
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     profilePhoto: {
//       type: String,
//       required: false,
//     },
//     gender: {
//       type: String,
//       enum: ["male", "female", "other"],
//       required: true,
//     },
//     aboutMe: {
//       type: String,
//       required: false,
//     },
//     interest: {
//       type: String,
//       required: false,
//     },
//     contactNumber: {
//       type: Number,
//       required: true,
//     },
//     emergencyContact: {
//       type: String,
//       required: false,
//     },


//   },
//   {
//     timestamps: true,
//   }
// );

// const elderModel = model("elder", ElderlySchema);

// export default elderModel;
