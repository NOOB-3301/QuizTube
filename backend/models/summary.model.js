import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    videoId:{
        type: String,
        required: true,
    },
    videoLink:{
        type: String,
        required: true,
    },
    summary:{
        type: String,
        required: true,
    }
},{timestamps: true});

const SummaryModel = mongoose.model("Summary", summarySchema);

export { SummaryModel };