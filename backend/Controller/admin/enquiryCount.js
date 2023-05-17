const { default: jwtDecode } = require('jwt-decode');
const enquiryDatas = require('../../model/enquirySchema')
const propertySchema = require('../../model/postproperty')

const EnquiryCount = async (req, res, next) => {
    try {
        const decode = jwtDecode(req.token)
        if (decode.role === 'Admin') {

            // Get Property Id ...
            const propertyIds = await propertySchema.find({}, { image: '', sellerName: '', propsId: '' });
            const id = []
            propertyIds.forEach(element => {
                id.push(element._id.toString())
            });

            // Find Enquiry Count ...
            const individualPropsEnquiryCount = [];
            var index = 1;
            id.forEach(async (element) => {
                const value = await enquiryDatas.find({ propertyId: element }).count();
                const countInfo = {
                    propertyId: element,
                    propsId: propertyIds[index - 1].propsId,
                    sellerName: propertyIds[index - 1].sellerName,
                    propertyImage: propertyIds[index - 1].image[0],
                    enquiryCount: value
                }
                individualPropsEnquiryCount.push(countInfo)
                if (id.length === index) {
                    const data = {
                        status: 200,
                        message: 'Success',
                        data: individualPropsEnquiryCount
                    }
                    res.status(200).json(data)
                }
                index++
            });
        } else if (decode.role === 'Seller') {
            // throw new Error('Cannot access this page')
            const propertyIds = await propertySchema.aggregate([{ $match: { sellerId: decode.id } }])
            const individualPropsEnquiryCount = [];
            var index = 1;
            propertyIds.forEach(async (element) => {
                const value = await enquiryDatas.aggregate([{ $match: { propsId: element.propsId } }, { $count: 'count' }]);
                console.log('Count: ', value, element);
                if (value.length !== 0) {
                    const countInfo = {
                        propertyId: element._id,
                        propsId: element.propsId,
                        sellerName: element.sellerName,
                        propertyImage: element.image[0],
                        enquiryCount: value[0].count
                    }
                    individualPropsEnquiryCount.push(countInfo)
                } else {
                    const countInfo = {
                        propertyId: element._id,
                        propsId: element.propsId,
                        sellerName: element.sellerName,
                        propertyImage: element.image[0],
                        enquiryCount: 0
                    }
                    individualPropsEnquiryCount.push(countInfo)
                }
                if (propertyIds.length === index) {
                    const data = {
                        status: 200,
                        message: 'Success',
                        data: individualPropsEnquiryCount
                    }
                    res.status(200).json(data)
                }
                index++
            });
        }
    } catch (err) {
        const data = {
            status: 400,
            message: 'Failed',
            data: err.message
        }
        res.status(500).json(data)
    }

}

module.exports = EnquiryCount;