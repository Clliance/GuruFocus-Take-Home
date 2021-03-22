import Express from 'express'
const router = Express.Router();
import User from '../../models/user'
import {MD5_SUFFIX,responseClient,md5} from '../util'


router.post('/login', (req, res) => {
    let {username, password} = req.body;
    if (!username) {
        responseClient(res, 400, 2, 'Username can not be empty');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, 'Password can not be empty');
        return;
    }
    User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if (userInfo) {
            //success sign in
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            // session set up after sign in
            req.session.userInfo = data;

            responseClient(res, 200, 0, 'Successed Signed In', data);
            return;
        }
        responseClient(res, 400, 1, 'Incorrect username or password');

    }).catch(err => {
        responseClient(res);
    })
});


router.post('/register', (req, res) => {
    let {userName, password, passwordRe} = req.body;
    if (!userName) {
        responseClient(res, 400, 2, 'Username can not be empty');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, 'Password can not be empty');
        return;
    }
    if (password !== passwordRe) {
        responseClient(res, 400, 2, 'Different passwords');
        return;
    }
    
    //User already exists
    User.findOne({username: userName})
        .then(data => {
            if (data) {
                responseClient(res, 200, 1, 'Username already exists');
                return;
            }
            //保存到数据库
            let user = new User({
                username: userName,
                password: md5(password + MD5_SUFFIX),
                type: 'admin'
            });
            user.save()
                .then(function () {
                    User.findOne({username: userName})
                        .then(userInfo=>{
                            let data = {};
                            data.username = userInfo.username;
                            data.userType = userInfo.type;
                            data.userId = userInfo._id;
                            responseClient(res, 200, 0, 'Successfully Signed Up', data);
                            return;
                        });
                })
        }).catch(err => {
        responseClient(res);
        return;
    });
});

//用户验证
router.get('/userInfo',function (req,res) {
    if(req.session.userInfo){
        responseClient(res,200,0,'',req.session.userInfo)
    }else{
        responseClient(res,200,1,'Please Sign In Again',req.session.userInfo)
    }
});

router.get('/logout',function (req,res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;