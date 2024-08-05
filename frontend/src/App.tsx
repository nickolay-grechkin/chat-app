import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './views/MainPage/MainPage.tsx';
import { Login } from './views/Login/Login.tsx';
import { JSX } from 'react';

const AppRoutes = (): JSX.Element => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <MainPage />,
		},
		{
			path: '/login',
			element: <Login />,
		},
	]);

	return <RouterProvider router={router} />;
};

export { AppRoutes };
