import './App.css';
import SignUpForm from './component/form';
import RetreiveToken from './component/retreiveToken';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/getToken'>
					<RetreiveToken />
				</Route>
				<Route path='/'>
					<SignUpForm />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
