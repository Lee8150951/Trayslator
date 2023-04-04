import { Routes, Route, HashRouter } from 'react-router-dom';
import Main from './views/Main';
import Setting from './views/Setting';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
