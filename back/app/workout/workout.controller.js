import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { calculateMinute } from './calculate-minute.js'

//@desc Get workout
//@route GET /api/workout/:id
//@access private
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},

		include: {
			exercises: true
		}
	})

	res.json(workouts)
})

//@desc Get workout
//@route GET /api/workout/:id
//@access private
export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: { id: +req.params.id },
		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(404)
		throw new Error('Workout not found')
	}

	const minutes = calculateMinute(workout.exercises.length)

	res.json({ ...workout, minutes })
})

//@desc create new workout
//@route POST /api/exercises
//@access private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id }))
			}
		}
	})

	res.json(workout)
})

//@desc Update new workout
//@route POST /api/exercises/:id
//@access private
export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					connect: exerciseIds.map(id => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
		console.log(error)
	}
})

//@desc Delete workout
//@route DELETE /api/exercises/:id
//@access private
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: 'Workout deleted!' })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
