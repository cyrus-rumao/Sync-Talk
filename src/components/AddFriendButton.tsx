'use client';
import React, { useState } from 'react';
import Button from './ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddFriendButton = () => {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState<boolean>(false);
	const handleAddFriend = (e: React.FormEvent) => {
		e.preventDefault();
		addFriend(email);
	};

	const addFriend = async (email: string) => {
		try {
			// console.log("Adding friend with email:", email);
			const response = await axios.post('/api/friends/add', { email });
			console.log("Response:", response);
			toast.success('Friend request sent!');
			setSuccess(true);
		} catch (error) {
			setSuccess(false);
			// console.log(error.response.data);
			toast.error(error.response.data.error);
		}
	};

	return (
		<div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">Add Friend</h2>
			<form onSubmit={handleAddFriend}>
				<label
					htmlFor="friend-email"
					className="block text-sm font-medium mb-2">
					Add friend by email
				</label>
				<input
					id="friend-email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter email address"
					required
					className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<Button>Add Friend</Button>
			</form>
		</div>
	);
};

export default AddFriendButton;
