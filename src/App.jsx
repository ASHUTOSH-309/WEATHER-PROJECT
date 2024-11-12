

import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn'
import LandingPage from './components/LandingPage'
import D3Chart from './components/D3Chart';

const App = () => {
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Signup />}/>
				<Route path='/login' element={<SignIn />} />
				<Route path='/landing' element={<LandingPage />} />
				<Route path="/d3" element={<D3Chart />} />
			</Routes>
		
		</BrowserRouter>
	)
}
export default App;