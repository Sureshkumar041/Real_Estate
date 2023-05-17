const SendEmailService = require("../../service/sendEmailService");

const SendEmailController = async (req, res, next) => {
    try {
        const propertyList = [
            [
                'categoryname',
                'productname',
                'description',
                'images',
                'price',
                'quantity'
            ],
            ['television', 'xiami', 'good tv', '', 20000, 5],
            ['bat', 'Quality bat', 'Nalla Bat', '', 750, 100],
            ['computer', 'Dell', 'Latest', '', 35000, 10]
        ]

        var propertyArray = [];

        for (let i = 1; i <= propertyList.length - 1; i++) {
            var propertyObj = {}
            for (let j = 0; j < propertyList[0].length; j++) {
                propertyObj[propertyList[0][j]] = propertyList[i][j]
            }
            propertyArray.push(propertyObj)
        }

        console.log('Property Arr: ', propertyArray);

        // const resp = await SendEmailService(req)
        // console.log('resp: ', resp);
        // return res.status(resp.status).json(resp)
    } catch (err) {
        console.log('Errr: ', err);
        const data = {
            status: 500,
            message: 'Failed',
            data: err.message
        }
        return res.status(500).json(data)
    }
}

module.exports = SendEmailController;