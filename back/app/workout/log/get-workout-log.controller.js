import { prisma } from '../../prisma.js'
import { calculateMinute } from '../calculate-minute.js'
import asyncHandler from 'express-async-handler'

// @desc Get workout log
// @route GET /api/workouts/log/:id
// @access Private
export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await prisma.workoutLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	})

	if (!workoutLog) {
		res.status(404)
		throw new Error('Workout Log not found')
	}

	// Логирование для отладки
	// console.log('WorkoutLog from DB:', JSON.stringify(workoutLog, null, 2))

	res.json({
		...workoutLog,
		minute: calculateMinute(workoutLog.workout.exercises.length)
	})
})
