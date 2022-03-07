import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GamePage from './components/GamePage';
import ErrorPage from './components/ErrorPage';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GamePage/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
