import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Paginas/Home';
import Detalhes from './Paginas/Detalhes';

function RouterApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path= "/" element={<Home />} />
                <Route path= "/detalhes/:id" element={<Detalhes />} />
            </Routes>
        </BrowserRouter>
    );
}


export default RouterApp;