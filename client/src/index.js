import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import GlobalFonts from './fonts/fonts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalFonts />
		<RouterProvider router={Router}></RouterProvider>
	</React.StrictMode>
);
