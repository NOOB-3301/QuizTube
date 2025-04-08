import mongoose from "mongoose";

const laqSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    }
},{timestamps: true});
const LaqModel = mongoose.model("Laq", laqSchema);
export { LaqModel };