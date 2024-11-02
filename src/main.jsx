import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Route } from 'react-router-dom';
import { createBrowserRouter  } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Protected } from './components/Protected';
import { ToastContainer } from 'react-toastify';
import UserContext from './context/UserContext';
import { ImageContextProvider } from './context/ImageContext';
const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/login' element={<Login/>} />
    <Route path='/' element={<Protected><Layout/></Protected>}>
      <Route path='/' element={<Home/>} />
    </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <UserContext>
        <ImageContextProvider>
          <RouterProvider router={router}/>
        </ImageContextProvider>
        <ToastContainer />
      </UserContext>
  </StrictMode>
);
