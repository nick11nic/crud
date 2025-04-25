import "./App.css"; // Importa os estilos da aplicação
import DataList from "./components/DataList.jsx";
import Detalhes from "./components/Detalhes.jsx"
import CreateForm from "./components/CreateForm.jsx";
import EditForm from "./components/EditForm.jsx"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataList />} />
          <Route path="/detalhes" element={<Detalhes />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/edit/:id" element={<EditForm />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;