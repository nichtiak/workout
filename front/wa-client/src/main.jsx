import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/styles/index.scss'
import AuthProvider from './providers/AuthProvider'
import Router from './routes/Routes'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
)
