import bookmarkModel from "../models/bookmarkModel.js";

export async function getUserBookmarks(req,res) {
    const userId=req.user.id;
    const bookmarks = await bookmarkModel.find({ user: userId });
    res.status(200).json({success:true,bookmarks});
} 



export async function addUserBookmark(req,res) {
    const userId=req.user.id;
    const { title, url, description, source, publishedAt, urlToImage } = req.body;
    try {
        const bookmarkExists=await bookmarkModel.findOne({user:userId ,url });
 
        if (bookmarkExists) {
            return res.json({success:false, message:'Already bookmarked' });
          }
        
          const bookmark = new bookmarkModel({
            user: userId,
            title,
            url,
            description,
            source,
            publishedAt,
            urlToImage
          });

          await bookmark.save();
          res.status(201).json({success:true,bookmark,message:'Article Added successfully'});
    } catch (error) {
        console.log(error.message);
        
    }
}



export async function removeBookmark(req,res) {
    try {
        const bookmark = await bookmarkModel.findByIdAndDelete(req.params.id);
  
        if (!bookmark ) {
          return res.status(404).json({success:false, message: 'Bookmark not found or unauthorized' });
        }
      
        res.json({success:true, message: 'Bookmark removed' });
    } catch (error) {
        console.log(error.message);
    }

}