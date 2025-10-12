import { useQuery } from '@tanstack/react-query'

import UserServices from '../../../services/user.service'

export const useProfile = () => {
	return useQuery({
		queryKey: ['get profile'],
		queryFn: () => UserServices.getProfile(),
		select: ({ data }) => data
	})
}
