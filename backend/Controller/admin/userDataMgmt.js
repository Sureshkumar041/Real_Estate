const sellerSchema = require('../../model/sellerSchema')
const buyerSchema = require('../../model/buyerSchema');
const { default: jwtDecode } = require('jwt-decode');

const UserDataMgmt = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token);
        const pageNo = req.query.pageNo,
            dataPerPage = 5,
            start = pageNo * dataPerPage - dataPerPage,
            last = start + dataPerPage;

        const sendResponse = (sts, msg, info, dataSize) => {
            const totalPage = Math.ceil(dataSize / dataPerPage)
            const data = {
                status: sts,
                message: msg,
                data:
                {
                    userData: info,
                    totalPage: totalPage
                }
            };
            res.status(sts).json(data)
        }

        if (decode.role === 'Admin') {
            if (req.query.role === 'Seller') {
                // const totalData = await sellerSchema.aggregate([{ $count: 'count' }]);
                // const userData = await sellerSchema.aggregate([
                //     {
                //         $skip: start,
                //     },
                //     {
                //         $limit: dataPerPage
                //     }
                // ]);
                const userData = await sellerSchema.aggregate([
                    { $skip: 1 }
                ]);
                const dataSize = userData.length;
                sendResponse(200, 'Success', userData.slice(start, last), dataSize)
                // sendResponse(200, 'Success', userData, totalData[0].count)
            } else {
                if (req.query.role === 'Buyer') {
                    const totalData = await buyerSchema.aggregate([{ $count: 'count' }]);
                    const userData = await buyerSchema.aggregate([
                        {
                            $skip: start
                        },
                        {
                            $limit: dataPerPage
                        }
                    ])
                    sendResponse(200, 'Success', userData, totalData[0].count)
                } else {
                    const sellerData = await sellerSchema.aggregate([
                        { $skip: 1 }
                    ]);
                    const buyerData = await buyerSchema.find();
                    const userData = [...sellerData, ...buyerData]
                    const dataSize = userData.length;
                    sendResponse(200, 'Success', userData.slice(start, last), dataSize)
                }
            }
        } else {
            // 404 - Unauthorized
            sendResponse(401, 'Failed', 'You cannot access this page')
        }
    } catch (err) {

    }
}

module.exports = UserDataMgmt;
