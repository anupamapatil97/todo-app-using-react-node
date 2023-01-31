import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from './../pages/auth/login/login';
import Register from './../pages/auth/register/register';

const Routing=()=>{
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}

export default Routing