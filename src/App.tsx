import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import Header from './components/Header';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

import './App.scss';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorFalse } from './store/data/dataSlice';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#e2264d',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function App() {
  const error = useAppSelector(state => state.data.error);
  const dispatch = useAppDispatch();

  // raise error toast on fetch error
  useEffect(() => {
    if (error) {
      toast.error('Something went wrong :(', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(setErrorFalse());
    }
  }, [error])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
