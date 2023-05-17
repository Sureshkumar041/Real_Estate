const express = require('express')
const route = express.Router()
const signup = require('../Controller/admin/signup')
const login = require('../Controller/admin/login')
const imageStore = require('../Controller/seller/postpropertyapi')
const addLocation = require('../Controller/admin/addLocation')
const Fileupload = require('../config/upload')
const showLocation = require('../Controller/common/showLocation')
const addPropertyCon = require('../Controller/admin/propertyForapi')
const cartImage = require('../Controller/common/cartImage')
const showPropertyFor = require('../Controller/common/showPropertyFor')
const addingPropertyType = require('../Controller/admin/propertyTypeApi')
const showPropertyType = require('../Controller/common/showPropertyType')
const auth = require('../Controller/auth')
const verifyToken = require('../middleware/verify')
const ownProperty = require('../Controller/seller/showOwnProperty')
const updateProperty = require('../Controller/seller/updateProperty')
const deleteProperty = require('../Controller/seller/deleteProperty')
const getEditProperty = require('../Controller/seller/getEditProperty')
const buyerRequest = require('../Controller/buyer/buyerEnquiry')
const ReceiveBuyerEnquiry = require('../Controller/buyer/receiveBuyerEnquiry')
const propertyEnquiries = require('../Controller/admin/propertyEnquiries')
const enquiryData = require('../Controller/common/enquiry')
const receiveEnquiry = require('../Controller/common/receiveEnquiry')
const filterCartImage = require('../Controller/common/filterCartImage')
const EnquiryCount = require('../Controller/admin/enquiryCount')
const IndividualPropertyEnquiry = require('../Controller/admin/individualPropertyEnquiry')
const EditProfile = require('../Controller/common/editProfile')
const GetUserData = require('../Controller/common/getUserData')
const ChangePassword = require('../Controller/common/changePassword')
const Notifications = require('../Controller/common/notification')
const UserDataMgmt = require('../Controller/admin/userDataMgmt')
const ForgotPassword = require('../Controller/common/forgotPassword')
const ChangeStatus = require('../Controller/admin/changeStatus')
const AddDetails = require('../Controller/common/addDetails')
const DelImage = require('../Controller/seller/delImage')
const PropsEnquiries = require('../Controller/admin/propsEnquiries')
const SendDocument = require('../Controller/common/sendDocument')
const NewPassword = require('../Controller/common/newPassword')
const VerifyOtp = require('../Controller/common/verifyOtp')
const SendEmailController = require('../Controller/common/sendEmailController')

// User API...!
route.post('/realestate/signup', signup)
route.post('/realestate/login', login)
route.post(
  '/realestate/property',
  Fileupload.Fileupload('./uploads').array('image', 10),
  imageStore
)
route.post('/realestate/addlocation', addLocation)
route.post('/realestate/propertyfor', addPropertyCon)
route.post('/realestate/propertyType', addingPropertyType)
route.post('/realestate/auth', verifyToken, auth)
route.post('/realestate/buyerenquiry', verifyToken, buyerRequest)
route.post('/realestate/enquirysend',
  Fileupload.Fileupload('./documents').array('document', 10),
  verifyToken, enquiryData)
route.post('/realestate/user/senddocument',
  Fileupload.Fileupload('./documents').array('document', 10),
  verifyToken, SendDocument)
route.post('/realestate/user/verifyotp', VerifyOtp)
route.post('/realestate/user/useractivity', verifyToken, SendEmailController)


// Get API ...!
route.get('/realestate/cartimage', cartImage)
route.get('/realestate/getproperty', filterCartImage)
route.get('/realestate/showlocation', showLocation)
route.get('/realestate/showpropertyfor', showPropertyFor)
route.get('/realestate/showpropertytype', showPropertyType)
route.get('/realestate/ownproperty/:id', verifyToken, ownProperty)
route.get('/realestate/editproperty', getEditProperty)
route.get('/realestate/receive/buyerenquiry/:id', verifyToken, ReceiveBuyerEnquiry)
route.get('/realestate/admin/enquiry', verifyToken, propertyEnquiries)
route.get('/realestate/receiveenquiry', verifyToken, receiveEnquiry)
route.get('/realestate/enquirycount', verifyToken, EnquiryCount)
route.get('/realestate/individualpropsenquiry', verifyToken, IndividualPropertyEnquiry)
route.get('/realestate/getuserdata', verifyToken, GetUserData)
route.get('/realestate/mynotification', verifyToken, Notifications)
route.get('/realestate/admin/userdata', verifyToken, UserDataMgmt)
route.get('/realestate/admin/propsenquiries', verifyToken, PropsEnquiries)

// Put API...!
route.put('/realestate/updateproperty/:id', verifyToken, Fileupload.Fileupload('./uploads').array('image', 10), updateProperty)
route.put('/realestate/user/editprofile',
  Fileupload.Fileupload('./profileImages').single('profileImage'),
  verifyToken, EditProfile)
route.put('/realestate/user/adddetails', verifyToken, AddDetails)
route.put('/realestate/admin/changestatus', verifyToken, ChangeStatus)
route.put('/realestate/user/changepassword', verifyToken, ChangePassword)
route.put('/realestate/user/forgotpassword', ForgotPassword)
route.put('/realestate/user/newpassword', NewPassword)
route.put('/realestate/seller/delimage', verifyToken, DelImage)

// Delete API...!
route.delete('/realestate/deleteproperty/:id', verifyToken, deleteProperty)

module.exports = route