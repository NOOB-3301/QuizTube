import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question:{
        type:String
    },
    options:[{
        type:String
    }],
    connrectIndex:{
        type:Number
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    }
},{timestamps: true});

const QuizModel = mongoose.model("Quiz", quizSchema);

export { QuizModel };