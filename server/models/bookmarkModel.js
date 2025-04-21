import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      title: {
        type: String
       },
      url: {
        type: String,
        required: true,
      },
      description: {
        type: String
       },
      source: Object,
      urlToImage: {
        type: String
       },
      publishedAt: {
        type: String
       },
    },
    { timestamps: true }
  );

const bookmarkModel=new mongoose.model('bookmark',bookmarkSchema);

export default bookmarkModel;