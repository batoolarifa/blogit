import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import BlogList from './pages/BlogList.jsx'

import PrivateRoute from "./components/PrivateRoute.jsx";
import Setting from './pages/Setting.jsx'
import Profile from './pages/Profile.jsx'
import WritePost from './pages/WritePost.jsx'
import Post from './pages/Post.jsx'
import UserProfile from './pages/UserProfilePage.jsx'
import UserFollowerList from './pages/UserFollowerList.jsx'
import UserFollowingList from './pages/UserFollowingList.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index= {true}path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login />} />
         {/* Private Routes*/}
      <Route path='' element={<PrivateRoute/>} >
          <Route path='/profile' element={ <Profile/>} />
          <Route path='/setting' element= {<Setting />} />
             <Route path='/blogs' element={ <BlogList/>} />
             <Route path='/blog/:blogId' element={<Post/>} />
             <Route path='/publish' element={<WritePost/>} />
             <Route path='/profile' element={<Profile/>} />
             <Route path='/:username' element={<UserProfile/>} />
             <Route path='/followers' element={<UserFollowerList/>} />
             <Route path='/following' element={<UserFollowingList/>} />

      </Route>
      

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
    <RouterProvider router={router} />
    </StrictMode>,
  </Provider>
)
