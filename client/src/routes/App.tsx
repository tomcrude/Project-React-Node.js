import {Route, Routes,BrowserRouter as Router, Navigate} from "react-router-dom"
import LogIn from "../pages/log-in";
import Main from "../pages/main";
import SignUp from "../pages/sign-up";
import Video from "../pages/video";
import CreateEdit from "../pages/video-create-edit";
import User from "../pages/user";

function App() {

  // Here are all the routes of the project.

  let token = localStorage.getItem("token")

  return (
   <Router>
      <Routes>
        <Route path="/sign-up" element={token === null || token === undefined ? (<SignUp/>):<Navigate to="/main"/>}/>
        <Route path="/log-in" element={token === null || token === undefined ? (<LogIn/>):<Navigate to="/main"/>}/>

        <Route path="/main" element={token !== null || token !== undefined ? (<Main/>):<Navigate to="/log-in"/>}/>
        <Route path="/video/:id" element={token !== null || token !== undefined ? (<Video/>):<Navigate to="/log-in"/>}/>
        <Route path="/video/create-edit/:id" element={token !== null || token !== undefined ? (<CreateEdit/>):<Navigate to="/log-in"/>}/>

        <Route path="/user/:id" element={token !== null || token !== undefined ? (<User/>):<Navigate to="/log-in"/>}/>

        <Route path="/*" element={ <Navigate to="/sign-up"/> }/>
      </Routes>
   </Router>
  );
}

export default App;
