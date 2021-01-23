'use strict'

const db = require('../server/db')
const {User, Workout} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.create({firstName: 'Andi', lastName: 'Plummer', email: 'andi@gmail.com', password: '123'}),
    User.create({firstName: 'Jim', lastName: 'Plummer', email: 'jim@gmail.com', password: '123'})
  ])

  // await Promise.all([
  //   Workout.create({dateFrom: '2021-01-01', dateTo: '2021-01-01', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-02', dateTo: '2021-01-02', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-03', dateTo: '2021-01-03', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-04', dateTo: '2021-01-04', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-05', dateTo: '2021-01-05', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-06', dateTo: '2021-01-06', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-07', dateTo: '2021-01-07', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-08', dateTo: '2021-01-08', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-09', dateTo: '2021-01-09', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-10', dateTo: '2021-01-10', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-11', dateTo: '2021-01-11', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-12', dateTo: '2021-01-12', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-13', dateTo: '2021-01-13', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-14', dateTo: '2021-01-14', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-15', dateTo: '2021-01-15', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-16', dateTo: '2021-01-16', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-17', dateTo: '2021-01-17', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-18', dateTo: '2021-01-18', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-19', dateTo: '2021-01-19', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-20', dateTo: '2021-01-20', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-21', dateTo: '2021-01-21', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-22', dateTo: '2021-01-22', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-23', dateTo: '2021-01-23', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-24', dateTo: '2021-01-24', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-25', dateTo: '2021-01-25', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-26', dateTo: '2021-01-26', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-27', dateTo: '2021-01-27', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-28', dateTo: '2021-01-28', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-29', dateTo: '2021-01-29', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-30', dateTo: '2021-01-30', distance: 3.22, userId: 3 }),
  //   Workout.create({dateFrom: '2021-01-31', dateTo: '2021-01-31', distance: 3.22, userId: 3 }),
  // ])

  await Promise.all([
    Workout.create({dateFrom: '2021-01-01', dateTo: '2021-01-01', distance: 3.09, userId: 1 }),
    Workout.create({dateFrom: '2021-01-02', dateTo: '2021-01-02', distance: 4.56, userId: 1 }),
    Workout.create({dateFrom: '2021-01-03', dateTo: '2021-01-03', distance: 4.51, userId: 1 }),
    Workout.create({dateFrom: '2021-01-04', dateTo: '2021-01-04', distance: 4.29, userId: 1 }),
    Workout.create({dateFrom: '2021-01-05', dateTo: '2021-01-05', distance: 5.43, userId: 1 }),
    Workout.create({dateFrom: '2021-01-06', dateTo: '2021-01-06', distance: 3.7, userId: 1 }),
    Workout.create({dateFrom: '2021-01-07', dateTo: '2021-01-07', distance: 4.87, userId: 1 }),
    Workout.create({dateFrom: '2021-01-08', dateTo: '2021-01-08', distance: 2.11, userId: 1 }),
    Workout.create({dateFrom: '2021-01-09', dateTo: '2021-01-09', distance: 5.92, userId: 1 }),
    Workout.create({dateFrom: '2021-01-10', dateTo: '2021-01-10', distance: 2.36, userId: 1 }),
    Workout.create({dateFrom: '2021-01-11', dateTo: '2021-01-11', distance: 4.79, userId: 1 }),
    Workout.create({dateFrom: '2021-01-12', dateTo: '2021-01-12', distance: 5.58, userId: 1 }),
    Workout.create({dateFrom: '2021-01-13', dateTo: '2021-01-13', distance: 8.52, userId: 1 }),
    Workout.create({dateFrom: '2021-01-14', dateTo: '2021-01-14', distance: 1.9, userId: 1 }),
    Workout.create({dateFrom: '2021-01-15', dateTo: '2021-01-15', distance: 2.98, userId: 1 }),
    Workout.create({dateFrom: '2021-01-16', dateTo: '2021-01-16', distance: 2.67, userId: 1 }),
    Workout.create({dateFrom: '2021-01-17', dateTo: '2021-01-17', distance: 1.18, userId: 1 }),
    Workout.create({dateFrom: '2021-01-18', dateTo: '2021-01-18', distance: 0, userId: 1 }),
    Workout.create({dateFrom: '2021-01-19', dateTo: '2021-01-19', distance: 3.48, userId: 1 }),
    Workout.create({dateFrom: '2021-01-20', dateTo: '2021-01-20', distance: 1.98, userId: 1 }),
    Workout.create({dateFrom: '2021-01-21', dateTo: '2021-01-21', distance: 1.2, userId: 1 }),
  ])

  await Promise.all([
    Workout.create({dateFrom: '2021-01-01', dateTo: '2021-01-17', distance: 49.41, userId: 2 }),
    Workout.create({dateFrom: '2021-01-18', dateTo: '2021-01-19', distance: 7.12, userId: 2 }),
    Workout.create({dateFrom: '2021-01-20', dateTo: '2021-01-20', distance: 6.07, userId: 2 }),
    Workout.create({dateFrom: '2021-01-21', dateTo: '2021-01-21', distance: 5.18, userId: 2 }),
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed