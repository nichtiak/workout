import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import WorkoutService from '../../../services/workout/workout.service'

export const useNewWorkout = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		mode: 'onChange'
	})

	const { isSuccess, error, isPending, mutate } = useMutation({
		mutationKey: ['create workout'],
		mutationFn: body => WorkoutService.create(body),
		onSuccess: () => {
			reset({
				name: '',
				exerciseIds: []
			})
		}
	})

	const onSubmit = data => {
		mutate({
			name: data.name,
			exerciseIds: data.exerciseIds.map(ex => ex.value)
		})
	}

	return useMemo(
		() => ({
			register,
			handleSubmit,
			errors,
			control,
			isSuccess,
			error,
			isPending,
			onSubmit
		}),
		[errors, isSuccess, error, isPending]
	)
}
