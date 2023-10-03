import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './Main';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/todo',
		element: <App />,
	},
]);

export default Router;
