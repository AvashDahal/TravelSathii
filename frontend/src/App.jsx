import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./component/home/Home"

import ChatPage from "./component/chat/chatPage"

import { Navbar } from "./component/common/Navbar"
import RegisterForguid from "./component/auth/guide/RegisterForguid"
import LoginForguid from "./component/auth/guide/LoginForguid"
import RegisterFortourist from "./component/auth/tourist/RegisterFortourist"
import LoginFortourist from "./component/auth/tourist/LoginFortourist"
import Footer from "./component/common/Footer"
import Dashboard from "./component/user/dashboard/Dashboard"
import ProfileUpdate from "./component/user/dashboard/dashboardcomponents/Profileupdate"
import Request from "./component/user/dashboard/dashboardcomponents/Request"
import KYCForm from "./component/form/kyc"
import Form from "./component/form/book"
import ReviewForm from "./component/form/review"
import NotificationPage from "./component/auth/tourist/notification"
import Profile from "./component/user/dashboard/dashboardcomponents/Profile"
import GuideProfile from "./component/user/dashboard/dashboardcomponents/guideProfile"
import GuideRecommendation from "./component/common/recommend"


function App() {


  return (
  <>
 <BrowserRouter>
 <Navbar/>
 <Routes>
  <Route path="/" element={<Home></Home>}></Route>

  <Route path="/guideregister" element={<RegisterForguid/>}></Route>
  <Route path="/addreview" element={<ReviewForm/>}></Route>
  <Route path="/guideprofile" element={<GuideProfile/>}></Route>
  <Route path="/kyc" element={<KYCForm/>}></Route>
  <Route path="/notification" element={<NotificationPage/>}></Route>
  <Route path="/book" element={<Form/>}></Route>
  <Route path="/guidelogin" element={<LoginForguid/>}/>
  <Route path='/touristregister' element={<RegisterFortourist></RegisterFortourist>}/>
  <Route path="/touristlogin" element={<LoginFortourist></LoginFortourist>}></Route>
<Route path="/chat" element={<ChatPage/>}></Route>
<Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
<Route path="/profilecreate" element={<ProfileUpdate></ProfileUpdate>}></Route>
<Route path="/request" element={<Request></Request>}></Route>
<Route path="/profile/:guideId" element={<Profile></Profile>}/>
<Route path="/recommend" element={<GuideRecommendation/>}/>


 </Routes>
 </BrowserRouter>
 <Footer/>
  </>
  )
}

export default App
