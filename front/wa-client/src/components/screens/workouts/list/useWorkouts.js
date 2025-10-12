import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import workoutLogService from '../../../../services/workout/workout-log.service'
import workoutService from '../../../../services/workout/workout.service'

export const useWorkouts = () => {
	const { data, isSuccess } = useQuery({
		queryKey: ['get workouts'],
		queryFn: () => workoutService.getAll(),
		select: ({ data }) => data
	})

	const navigate = useNavigate()

	const {
		mutate,
		isPending,
		isSuccess: isSuccessMutate,
		error
	} = useMutation({
		mutationKey: ['Create new workout log'],
		mutationFn: workoutId => workoutLogService.create(workoutId),
		onSuccess: ({ data }) => {
			navigate(`/workout/${data.id}`)
		}
	})
	return {
		data,
		isSuccess,
		mutate,
		isPending,
		isSuccessMutate,
		error
	}
}
