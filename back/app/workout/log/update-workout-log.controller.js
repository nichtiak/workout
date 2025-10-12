import { prisma } from '../../prisma.js'
import asyncHandler from 'express-async-handler'

// @desc Update workout log completed
// @route PATCH /api/workouts/log/complete/:id
// @access Private
export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
	const logId = +req.params.id

	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: logId
			},
			data: {
				isCompleted: true
			}
		})
		res.json(workoutLog)
	} catch {
		res.status(404)
		throw new Error('Workout not found')
	}
})
