import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path: '/about', element: <About/>, exact: true},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostIdPage/> , exact: true},
]
export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true}
]
//<Route exact path='/posts' element={<Posts />}/>
//<Route exact path='/posts/:id' element={<PostIdPage />}/>
//<Route path='/about' element={<About />}/>
//<Route path='/error' element={<Error/>}/>