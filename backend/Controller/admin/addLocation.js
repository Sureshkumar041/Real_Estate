const locationSchema = require('../../model/locationSchema');

const addLocation = async (req, res, next) => {
    try {
        // const {location,no} = await req.body;
        console.log("Location: ",await req.body);
        let locationMaster = new locationSchema({
            location: req.body.location,
        });
        const count = await locationSchema.countDocuments({});
        locationMaster.no = count + 1;
        console.log("locationMaster.no: ", locationMaster.no);
        await locationMaster.save()
        var data = {
            status: 200,
            message: 'Location add sucessfully'
        }
        return res.json({ data: data });
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

module.exports = addLocation;