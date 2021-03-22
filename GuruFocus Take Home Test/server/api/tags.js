import Express from 'express'

const router = Express.Router();
import Tags from '../../models/tags'
import {responseClient} from '../util'

router.get('/delTag', function (req, res) {
    let {name} = req.query;
    Tags.remove({name})
        .then(result => {
            if(result.result.n === 1){
                responseClient(res,200,0,'Successfully Deleted')
            }else{
                responseClient(res,200,1,'Tags doesn\'t exist');
            }
        }).catch(err => {
        responseClient(res);
    });
});


router.post('/addTag', function (req, res) {
    let {name} = req.body;
    Tags.findOne({
        name
    }).then(result => {
        if (!result) {
            let tag = new Tags({
                name
            });
            tag.save()
                .then(data => {
                    responseClient(res, 200, 0, 'Successfully Added', data);
                }).catch(err => {
                throw err
            })
        } else {
            responseClient(res, 200, 1, 'Tags already exists');
        }
    }).catch(err => {
        responseClient(res);
    });
});


module.exports = router;