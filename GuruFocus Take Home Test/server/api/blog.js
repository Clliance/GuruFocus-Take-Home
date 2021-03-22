import Express from 'express'

const router = Express.Router();
import Blog from '../../models/blog'
import {responseClient} from '../util'

router.post('/addBlog', function (req, res) {
    const {
        title,
        content,
        time,
        tags,
        isPublish
    } = req.body;
    const author = req.session.userInfo.username;
    const coverImg =  `/${Math.round(Math.random() * 9 + 1)}.jpg`;
    const viewCount = 0;
    const commentCount = 0;
    let tempBlog = new Blog({
        title,
        content,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg,
        tags:tags.split(',')
    });
    tempBlog.save().then(data=>{
        responseClient(res,200,0,'Successfully Saved',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/updateBlog',(req,res)=>{
    const {
        title,
        content,
        time,
        tags,
        isPublish,
        id
    } = req.body;
    Blog.update({_id:id},{title,content,time,tags:tags.split(','),isPublish})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'Successfully Updated',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delBlog',(req,res)=>{
    let id = req.query.id;
    Blog.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'Successfully Deleted')
            }else{
                responseClient(res,200,1,'Blog doesn\'t exist');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

module.exports = router;