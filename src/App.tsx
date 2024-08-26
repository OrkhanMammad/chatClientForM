import './App.css';
import AppRouter from './router/router';
import "./assets/styles/reset/reset.scss"
import { ToastContainer } from 'react-toastify';
function App() {
    return (
        <div className='App'>
              <ToastContainer
                    position='bottom-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme='light'
                    style={
                        {
                            minHeight: 'auto',
                            maxHeight: '80vh',
                        }
                    }/>
            <AppRouter />
        </div>
    );
}

export default App;
