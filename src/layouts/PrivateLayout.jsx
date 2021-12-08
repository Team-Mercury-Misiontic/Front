import Sidebar from 'components/Sidebar';
import { Outlet, useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from 'graphql/auth/mutation';
import { useAuth } from 'context/AuthContext';

const PrivateLayout = () => {
	const navigate = useNavigate();
	const { authToken, setToken, loadingAuth } = useAuth();
	const [
		refreshToken,
		{ data: mutationData, loading: mutationLoading, error: errorMutation },
	] = useMutation(REFRESH_TOKEN);

	useEffect(() => {
		refreshToken();
	}, [refreshToken]);

	//Set token value
	useEffect(() => {
		console.log('Data', mutationData);
		// if (mutationData) {
		// 	if (mutationData.refreshToken.token) {
		// 		setToken(mutationData.refreshToken.token);
    //    } 
    //    else {
    //     setToken(null)
    //   }
		// }
	}, [mutationData]);

	useEffect(() => {
		console.log('current token:', authToken);
	}, [authToken]);

	// if (authToken === '') {
	// 	navigate('login');
	// }

	return (
		<div className="flex flex-col md:flex-row flex-no-wrap h-screen">
			<Sidebar />
			<div className="flex w-full h-full">
				<div className="w-full h-full  overflow-y-scroll">
					<Outlet />
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default PrivateLayout;
