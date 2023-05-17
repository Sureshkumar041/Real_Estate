const { default: jwtDecode } = require('jwt-decode');
const propertySchema = require('../../model/postproperty')

const DelImage = async (req, res, next) => {
    const index = req.query.index;
    const propsId = req.query.propsId;
    console.log('Index: ', index);

    const decode = jwtDecode(req.token);
    if (decode.role === 'Seller') {
        const property = await propertySchema.aggregate([{ $match: { propsId: propsId } }])
        const image = property[0].image.splice(index, 1)
        const filter = {
            _id: property[0]._id
        }
        const update = {
            $set: {
                image: image
            }
        }
        const result = await propertySchema.findByIdAndUpdate(filter, update)
        console.log('result: ', result);
        const data = {
            status: 200,
            message: 'Success',
            data: 'Deleted'
        }
        res.status(200).json(data)
    }
    // else{
    //     res.status(401).json('')
    // }
}

module.exports = DelImage;