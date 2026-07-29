import mongoose from 'mongoose';

import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        city: 'Seattle',
        motto: 'Climb stronger together.',
        sportFocus: 'Trail running',
      },
      {
        name: 'Metro Lifters',
        city: 'Chicago',
        motto: 'Consistency builds champions.',
        sportFocus: 'Strength training',
      },
      {
        name: 'Harbor Cyclers',
        city: 'San Diego',
        motto: 'Every mile sharpens the team.',
        sportFocus: 'Cycling',
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.dev',
        age: 29,
        fitnessLevel: 'Advanced',
        goals: ['Win local 10K', 'Improve hill endurance'],
        weeklyActiveMinutes: 320,
        location: 'Seattle',
        team: teams[0]._id,
      },
      {
        name: 'Jordan Brooks',
        email: 'jordan.brooks@octofit.dev',
        age: 34,
        fitnessLevel: 'Intermediate',
        goals: ['Build full-body strength', 'Train 4 days a week'],
        weeklyActiveMinutes: 260,
        location: 'Chicago',
        team: teams[1]._id,
      },
      {
        name: 'Elena Ramirez',
        email: 'elena.ramirez@octofit.dev',
        age: 31,
        fitnessLevel: 'Advanced',
        goals: ['Increase cycling power', 'Complete a century ride'],
        weeklyActiveMinutes: 410,
        location: 'San Diego',
        team: teams[2]._id,
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@octofit.dev',
        age: 26,
        fitnessLevel: 'Beginner',
        goals: ['Stay active after work', 'Finish first 5K'],
        weeklyActiveMinutes: 140,
        location: 'Seattle',
        team: teams[0]._id,
      },
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@octofit.dev',
        age: 38,
        fitnessLevel: 'Intermediate',
        goals: ['Lower resting heart rate', 'Add two recovery sessions'],
        weeklyActiveMinutes: 210,
        location: 'Chicago',
        team: teams[1]._id,
      },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, {
        captain: users[0]._id,
        members: [users[0]._id, users[3]._id],
      }),
      Team.findByIdAndUpdate(teams[1]._id, {
        captain: users[1]._id,
        members: [users[1]._id, users[4]._id],
      }),
      Team.findByIdAndUpdate(teams[2]._id, {
        captain: users[2]._id,
        members: [users[2]._id],
      }),
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Trail Run',
        durationMinutes: 68,
        distanceKm: 12.4,
        caloriesBurned: 740,
        completedAt: new Date('2026-07-24T06:30:00.000Z'),
        notes: 'Strong final climb and steady pacing.',
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'Strength Session',
        durationMinutes: 55,
        distanceKm: 0,
        caloriesBurned: 430,
        completedAt: new Date('2026-07-25T18:15:00.000Z'),
        notes: 'Focused on deadlifts, rows, and carries.',
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        type: 'Road Ride',
        durationMinutes: 95,
        distanceKm: 38.6,
        caloriesBurned: 980,
        completedAt: new Date('2026-07-26T14:00:00.000Z'),
        notes: 'Included three high-cadence intervals.',
      },
      {
        user: users[3]._id,
        team: teams[0]._id,
        type: 'Recovery Walk',
        durationMinutes: 35,
        distanceKm: 3.1,
        caloriesBurned: 170,
        completedAt: new Date('2026-07-27T12:20:00.000Z'),
        notes: 'Kept heart rate in zone 2.',
      },
      {
        user: users[4]._id,
        team: teams[1]._id,
        type: 'Rowing Erg',
        durationMinutes: 42,
        distanceKm: 10.2,
        caloriesBurned: 360,
        completedAt: new Date('2026-07-28T07:10:00.000Z'),
        notes: 'Negative split across final 10 minutes.',
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: '2026-W30',
        rank: 1,
        totalPoints: 1540,
        activityCount: 4,
        user: users[2]._id,
        team: teams[2]._id,
      },
      {
        period: '2026-W30',
        rank: 2,
        totalPoints: 1425,
        activityCount: 4,
        user: users[0]._id,
        team: teams[0]._id,
      },
      {
        period: '2026-W30',
        rank: 3,
        totalPoints: 1180,
        activityCount: 3,
        user: users[1]._id,
        team: teams[1]._id,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Lunchtime Mobility Reset',
        focus: 'Mobility',
        level: 'Beginner',
        durationMinutes: 20,
        equipment: ['Yoga mat'],
        description: 'A guided flow for hips, shoulders, and thoracic rotation after desk-heavy mornings.',
      },
      {
        title: 'Tempo Builder Ride',
        focus: 'Endurance',
        level: 'Intermediate',
        durationMinutes: 50,
        equipment: ['Bike trainer', 'Heart-rate monitor'],
        description: 'Warm up, then settle into two sustained tempo blocks to raise aerobic capacity.',
      },
      {
        title: 'Lower-Body Power Circuit',
        focus: 'Strength',
        level: 'Advanced',
        durationMinutes: 45,
        equipment: ['Barbell', 'Kettlebell', 'Bench'],
        description: 'Alternates heavy squats, swings, and split squats for force production and control.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
