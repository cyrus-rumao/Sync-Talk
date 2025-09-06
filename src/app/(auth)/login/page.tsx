/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
const page = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	async function loginWithGoogle() {
		// setIsLoading(true);
		// setTimeout(() => setIsLoading(false), 2000);
		setIsLoading(true);
		try {
			await signIn('google');
		} catch (error) {
			console.log('Error:', error);
			toast.error('Something Went Wrong. Please try again later');
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div className="min-h-screen bg-black flex">
			{/* Left Panel - Branding */}
			<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

				{/* Animated grid pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="grid grid-cols-12 h-full">
						{Array.from({ length: 144 }).map((_, i) => (
							<div
								key={i}
								className="border-r border-b border-gray-700 animate-pulse"
								style={{
									animationDelay: `${i * 50}ms`,
									animationDuration: '3s',
								}}></div>
						))}
					</div>
				</div>

				<div className="relative z-10 flex flex-col justify-center px-16 text-white">
					<div className="space-y-8">
						<div className="space-y-4">
							<div className="h-12 w-fit bg-white rounded-lg flex items-center justify-center">
								<span className="text-black font-bold text-xl">Sync <span className='text-blue-400'>Talk</span></span>
							</div>
							<h2 className="text-4xl font-bold tracking-tight">
								Enter the
								<br />
								<span className="text-gray-400">workspace</span>
							</h2>
						</div>

						<div className="space-y-6 text-gray-300">
							<div className="flex items-start gap-3">
								<div className="h-1.5 w-1.5 bg-white rounded-full mt-2"></div>
								<p className="text-sm leading-relaxed">
									Seamless collaboration across teams and projects
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="h-1.5 w-1.5 bg-white rounded-full mt-2"></div>
								<p className="text-sm leading-relaxed">
									Enterprise-grade security and data protection
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="h-1.5 w-1.5 bg-white rounded-full mt-2"></div>
								<p className="text-sm leading-relaxed">
									Real-time insights and analytics dashboard
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Panel - Login Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
				<div className="w-full max-w-sm space-y-8">
					{/* Mobile Logo */}
					<div className="lg:hidden text-center">
						<div className="inline-flex h-10 w-10 bg-black rounded-lg items-center justify-center">
							<span className="text-white font-bold text-lg">L</span>
						</div>
					</div>

					{/* Form Header */}
					<div className="space-y-2">
						<h1 className="text-2xl font-bold text-black">
							Sign in to your account
						</h1>
						<p className="text-gray-600 text-sm">
							Welcome back! Please enter your details.
						</p>
					</div>

					{/* Login Form */}
					<div className="space-y-4">
						{/* Google Sign In */}
						<button
							onClick={loginWithGoogle}
							disabled={isLoading}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							className="w-full group relative overflow-hidden border border-gray-300 rounded-lg py-3 px-4 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
							<div className="flex items-center justify-center gap-3 relative z-10">
								{isLoading ? (
									<div className="h-4 w-4 animate-spin rounded-full border border-gray-400 border-t-black"></div>
								) : (
									<svg
										className="h-4 w-4"
										viewBox="0 0 24 24">
										<path
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											fill="#4285F4"
										/>
										<path
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											fill="#34A853"
										/>
										<path
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											fill="#FBBC05"
										/>
										<path
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											fill="#EA4335"
										/>
									</svg>
								)}
								<span className="font-medium text-gray-900 text-sm">
									{isLoading ? 'Authenticating...' : 'Continue with Google'}
								</span>
							</div>

							{/* Hover effect */}
							<div
								className={`absolute inset-0 bg-gray-50 transition-opacity duration-200 ${
									isHovered && !isLoading ? 'opacity-100' : 'opacity-0'
								}`}></div>
						</button>

						{/* Security Badge */}
						<div className="flex items-center justify-center gap-2 py-2">
							<div className="h-2 w-2 bg-green-500 rounded-full"></div>
							<span className="text-xs text-gray-500 font-medium">
								SSL Encrypted
							</span>
							<div className="h-3 w-px bg-gray-300"></div>
							<span className="text-xs text-gray-500 font-medium">
								SOC 2 Compliant
							</span>
						</div>
					</div>

					{/* Help Text */}
					<div className="text-center">
						<p className="text-xs text-gray-500">
							Need help?{' '}
							<a
								href="#"
								className="text-black font-medium hover:underline">
								Contact support
							</a>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-96">
					<div className="flex items-center justify-between text-xs text-gray-400">
						<span>© 2025 Company</span>
						<div className="flex gap-4">
							<a
								href="#"
								className="hover:text-black transition-colors">
								Privacy
							</a>
							<a
								href="#"
								className="hover:text-black transition-colors">
								Terms
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
