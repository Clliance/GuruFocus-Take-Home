import crypto from 'crypto'

module.exports = {
    MD5_SUFFIX: 'eiowafnajkdlfjsdkfj@#￥%……&）（*&……）',
    md5: function (pwd) {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex')
    },
    responseClient(res,httpCode = 500, code = 3,message='ServerException',data={}) {
        let responseData = {};
        responseData.code = code;
        responseData.message = message;
        responseData.data = data;
        res.status(httpCode).json(responseData)
    }
}