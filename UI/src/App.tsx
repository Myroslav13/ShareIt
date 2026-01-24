import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enter from "./components/Enter";
import Main from "./components/Main";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Enter/>}/>
            <Route path="/enter" element={<Enter/>}/>
            <Route path="/main" element={<Main/>}/>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
