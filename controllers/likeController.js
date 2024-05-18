const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async(req,res) => {
      try{
         const {post,user} = req.body;
         const like = new Like({
           post, user,
         });
         const savedLike = await like.save();

         const updatedPost = await Post.findByIdAndUpdate(post ,{$push: {likes: savedLike._id}} , {new:true})
         .populate("likes")
         .exec()

         res.json({
            post:updatedPost,
         })
      }
      catch(error){
         return res.status(500).json({
            error: "error"
           })
      }
}

exports.unlikePost = async(req,res) => {
    try{
       const {post, like} = req.body;

       const deletedLike = await Like.findByIdAndDelete({post:post ,_id:like});
    
       const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new:true})
       .populate("likes")
       .exec()

       res.json({
          post:updatedPost,
       })
    }
    catch(error){
       return res.status(500).json({
          error: "error"
         })
    }
}