import Express from 'express'
const router = Express.Router();

router.get('/',(req,res)=>{
    res.send('Backend API is running')
});

module.exports = router;