import { Link, Route, Routes, Outlet } from "react-router-dom";

const Welcome = () => {
    return (
        <section>
            <h1>Welcome Page</h1>
            {/*nested router */}
            <Link to='new-user'>New User</Link>
            {/* place nested router data */}
            <Outlet/>
            {/* <Routes> */}
                {/* <Route path='new-user' element={<p>Welcome new user</p>}/>                 */}                
            {/* </Routes> */}
        </section>)
};

export default Welcome;