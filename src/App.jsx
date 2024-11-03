

import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn'
import LandingPage from './components/LandingPage'


const App = () => {
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Signup />}/>
				<Route path='/login' element={<SignIn />} />
				<Route path='/landing' element={<LandingPage />} />
			</Routes>
		
		</BrowserRouter>
	)
}
export default App;