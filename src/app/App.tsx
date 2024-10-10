import { store } from './store';
import { Provider } from 'react-redux'
import MainContainer from '../containers/MainContainer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MainContainer />
      </LocalizationProvider>
    </Provider>
  )
}

export default App
