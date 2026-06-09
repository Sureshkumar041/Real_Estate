import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Components/LoginComponent/login";
import SignUp from "./Components/SignupComponent/signup";
import Homepage from "./Components/HomepageComponent/homepage";
import AdminDashboard from "./Components/AdminComponent/AdminDashboard/admindashboard";
import AdminMaster from "./Components/AdminComponent/AdminMasterComponent/adminmasterapi";
import Seller from "./Components/SellerComponent/SellerDashComponent/seller";
import PostProperty from "./Components/PostPropertyComponent/postproperty";
import BuyerComponent from "./Components/BuyerComponent/HomePage/buyer";
import AdminSellerMgmt from "./Components/AdminComponent/AdminMgmtSellerComponent/adminSellerMgmt";
import MyProperty from "./Components/SellerComponent/ManageSellerComponent/manageseller";
import UpdateProperty from "./Components/SellerComponent/UpdatePropertyComponent/updatePropertyApi";
import UpdateProp from "./Components/SellerComponent/UpdatePropertyComponent/updatePro";
import PropertyEnquiry from "./Components/SellerComponent/PropertyEnquiryComponent/propertyEnquiry";
import AdminBuyerMgmt from "./Components/AdminComponent/AdminMgmtBuyerComponent/adminBuyerMgmt";
import ViewProperty from "./Components/UserComponent/ViewPropertyComponent/viewProperty";
import Start from "./Components/SellerComponent/UpdatePropertyComponent/start";
import ReceiveEnquiry from "./Components/BuyerComponent/HomePage/Enquiry/receiveEnquiry";
import ShowPropsDetails from "./Components/UserComponent/ShowDetailsComponent/showPropsDetails";
import AdminPropertyEnquiry from "./Components/AdminComponent/AdminEnquiryComponent/adminEnquiry";
import EditUserProfile from "./Components/UserComponent/EditUserProfile.js/editUserProfile";
import ChangePassword from "./Components/UserComponent/ChangePasswordComponent/changePassword";
import Notifications from "./Components/UserComponent/NotificationsComponent/notifications";
import UserMgmt from "./Components/AdminComponent/UserRegisterMgmt.js/userMgmt";
import Header from "./Components/UserComponent/HeaderComponent/header";
import AddDetails from "./Components/UserComponent/AddDetailsComponent/addDetails";
import PropsEnquires from "./Components/SellerComponent/PropsEnquiriesComponent/propsEnquiries";
import PropertyEnquiries from "./Components/AdminComponent/AdminEnquiryComponent/PropertyEnquiryComponent/propertyEnquiries";
import ViewProfile from "./Components/UserComponent/ViewProfileComponent/viewProfile";
import SendOtp from "./Components/UserComponent/ForgotPasswordComponent/sendOtpComponent/sendOtp";
import VerifyOtp from "./Components/UserComponent/ForgotPasswordComponent/VerifyOtpComponent/verifyOtp";
import NewPassword from "./Components/UserComponent/ForgotPasswordComponent/NewPasswordComponent/newPassword";
import TestingPage from "./Components/RestingPape";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/homepage" element={<Header />} />
      <Route path="/test" element={<TestingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="" element={<BuyerComponent />} />
      <Route path="/showproperty/:id" element={<ViewProperty />} />
      <Route path="/user/unknowprofile/:userId" element={<ViewProfile />} />
      <Route path="/user/sendotp" element={<SendOtp />} />
      <Route path="/user/verifyotp/:userId" element={<VerifyOtp />} />
      <Route path="/user/newpassword/:userId" element={<NewPassword />} />

      <Route path="/propertyenquiry" element={<ReceiveEnquiry />} />
      <Route path="/viewproperty" element={<ShowPropsDetails />} />
      <Route path="/user/viewprofile" element={<AddDetails />} />
      <Route path="/user/editprofile" element={<EditUserProfile />} />
      <Route path="/user/changepassword" element={<ChangePassword />} />
      <Route path="/dashboard/notifications" element={<Notifications />} />
      <Route
        path="/admin/propsenquiry/:propsId"
        element={<PropertyEnquiries />}
      />

      <Route path="/seller" element={<Seller />} />
      <Route path="/postproperty" element={<PostProperty />} />
      <Route path="/manageproperty" element={<MyProperty />} />
      <Route path="/seller/updateproperty/:id" element={<UpdateProperty />} />
      <Route path="/propertyenquiry/:id" element={<PropertyEnquiry />} />
      <Route path="/seller/updateproperty" element={<UpdateProp />} />
      <Route path="/seller/editproperty/:id" element={<Start />} />
      <Route
        path="/seller/propsenquiries/:senderId"
        element={<PropsEnquires />}
      />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/master" element={<AdminMaster />} />
      <Route path="/admin/sellermgmt" element={<AdminSellerMgmt />} />
      <Route path="/admin/buyermgmt" element={<AdminBuyerMgmt />} />
      <Route path="/admin/enquiry" element={<AdminPropertyEnquiry />} />
      <Route path="/dashboard/usermgmt/:role" element={<UserMgmt />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
