import { useState } from "react";
import Button from '@mui/material/Button';
import './showPropsDetails.css'

const ShowPropsDetails = (props) => {

    console.log("Props IP: ", props && props.individualProperty ? props.individualProperty : 'Still Empty');
    const [individualProperty] = useState(props.individualProperty),
        [viewImage, setViewImage] = useState(individualProperty.image[0]);
    const fullImage = () => {
        console.log("viewImage: ", viewImage);
        return (
            <div className="col-6 imgwid" >
                <img src={viewImage} className='imgdiv' alt="Something went wrong" />
            </div >
        )
    }

    const viewProperty = () => {
        console.log("Image length: ", individualProperty.image.length);
        console.log("Property Id: ", props.individualProperty._id);
        return (
            <div className="individualProperty row">
                <div className="my-5 row mx-1">
                    {/* <div className="col-6 imgwid">
                        <img src={individualProperty.image[0]} className='imgdiv' alt="Something went wrong" />
                    </div> */}
                    {individualProperty && fullImage(individualProperty.image[0])}
                    <div className="col-6">
                        <Button color="primary" className="fs-5 row">
                            <table className="border-0 col">
                                <tbody>
                                    <tr>
                                        <td className="px-5 text-dark">Address</td>
                                        <td>{individualProperty.address} </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 text-dark">City</td>
                                        <td>{individualProperty.city} </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 text-dark">State</td>
                                        <td>{individualProperty.city} </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 text-dark">Pincode</td>
                                        <td>{individualProperty.pincode} </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 text-dark">Sqft</td>
                                        <td>{individualProperty.sqft} </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 text-dark">Rate per sqft</td>
                                        <td>{individualProperty.rate} </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 text-dark">Contact details</td>
                                        <td> {individualProperty.sellerName} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Button>
                        <div className="row">
                            <Button className="col-4 mx-3" variant='contained' color="success" >{individualProperty.propertyFor} </Button>
                            <Button className="col-4 mx-3" variant='outlined' color="error">{individualProperty.type} </Button>
                            {/* <Button className="col-2 mx-3" variant='contained' >{individualProperty.propertyFor} </Button> */}
                        </div>
                    </div>
                    {/* <Button variant='contained' onClick={() => window.location.reload()} >Back</Button> */}
                </div >
                <div className="row">
                    <div className="col-6 multiimg mx-3">
                        <div className="row">
                            {
                                individualProperty.image.map((item, index) => (
                                    <div key={index} className='col-3 multiDiv my-2 cp' onClick={() => setViewImage(item)} >
                                        <img src={item} className='multiPic' alt="Something went wrong" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-6 mx-3 border ">
                        <h5> Property Description :</h5>
                        <p> {individualProperty.info} </p>
                    </div>
                </div>
                <Button variant='contained' className="w-25 my-5" onClick={() => window.location.reload()} >Back</Button>
            </div>
        )
    }

    // const getProperty = async () => {
    //     await fetch(`${API}/editproperty?propertyId=${propertyId}`)
    //         .then(async res => {
    //             setIndividualProperty(await res.json())
    //         })
    //         .catch(err => console.log('View Property: ',err.message))
    // }

    // useEffect(() => {
    //     getProperty()
    // }, [])


    return (
        <>
            {viewProperty()}
        </>
    )
}

export default ShowPropsDetails;