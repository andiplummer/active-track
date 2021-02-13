'use strict'

const db = require('../server/db')
const {User, ActivityEntry, ActivityType} = require('../server/db/models')

async function seed() {
  // await db.sync({force: true})
  await db.sync()
  console.log('db synced!')

  // await Promise.all([
  //   User.create({firstName: 'Andi', lastName: 'Plummer', email: 'andi@gmail.com', password: 'newpassword'}),
  //   User.create({firstName: 'Jim', lastName: 'Plummer', email: 'jim@gmail.com', password: 'newpassword'}),
  //   // User.create({firstName: 'Sue', lastName: 'Plummer', email: 'sue@gmail.com', password: '123'}),
  //   // User.create({firstName: 'Jenny', lastName: 'Plummer', email: 'jenny@gmail.com', password: '123'})
  // ])

  // await Promise.all([
  //   ActivityType.create({name: 'run'}),
  //   ActivityType.create({name: 'walk'}),
  // ])

  await Promise.all([
    ActivityEntry.create({date: '2021-01-01', distance: 3.09, userId: 1 }),
    ActivityEntry.create({date: '2021-01-02', distance: 4.56, userId: 1 }),
    ActivityEntry.create({date: '2021-01-03', distance: 4.51, userId: 1 }),
    ActivityEntry.create({date: '2021-01-04', distance: 4.29, userId: 1 }),
    ActivityEntry.create({date: '2021-01-05', distance: 5.43, userId: 1 }),
    ActivityEntry.create({date: '2021-01-06', distance: 3.7, userId: 1 }),
    ActivityEntry.create({date: '2021-01-07', distance: 4.87, userId: 1 }),
    ActivityEntry.create({date: '2021-01-08', distance: 2.11, userId: 1 }),
    ActivityEntry.create({date: '2021-01-09', distance: 5.92, userId: 1 }),
    ActivityEntry.create({date: '2021-01-10', distance: 2.36, userId: 1 }),
    ActivityEntry.create({date: '2021-01-11', distance: 4.79, userId: 1 }),
    ActivityEntry.create({date: '2021-01-12', distance: 5.58, userId: 1 }),
    ActivityEntry.create({date: '2021-01-13', distance: 8.52, userId: 1 }),
    ActivityEntry.create({date: '2021-01-14', distance: 1.9, userId: 1 }),
    ActivityEntry.create({date: '2021-01-15', distance: 2.98, userId: 1 }),
    ActivityEntry.create({date: '2021-01-16', distance: 2.67, userId: 1 }),
    ActivityEntry.create({date: '2021-01-17', distance: 1.18, userId: 1 }),
    ActivityEntry.create({date: '2021-01-18', distance: 0, userId: 1 }),
    ActivityEntry.create({date: '2021-01-19', distance: 3.48, userId: 1 }),
    ActivityEntry.create({date: '2021-01-20', distance: 1.98, userId: 1 }),
    ActivityEntry.create({date: '2021-01-21', distance: 1.2, userId: 1 }),
    ActivityEntry.create({date: '2021-01-22', distance: 1.69, userId: 1 }),
    ActivityEntry.create({date: '2021-01-23', distance: 2.34, userId: 1 }),
    ActivityEntry.create({date: '2021-01-24', distance: 1.5, userId: 1 }),
    ActivityEntry.create({date: '2021-01-25', distance: 1.21, userId: 1 }),
    ActivityEntry.create({date: '2021-01-26', distance: 2.52, userId: 1 }),
    ActivityEntry.create({date: '2021-01-27', distance: 2.99, userId: 1 }),
    ActivityEntry.create({date: '2021-01-28', distance: 1.66, userId: 1 }),
    ActivityEntry.create({date: '2021-01-29', distance: 1.34, userId: 1 }),
    ActivityEntry.create({date: '2021-01-30', distance: 4.75, userId: 1 }),
    ActivityEntry.create({date: '2021-01-31', distance: 6.02, userId: 1 }),
    ActivityEntry.create({date: '2021-02-01', distance: 0.71, userId: 1 }),
    ActivityEntry.create({date: '2021-02-01', distance: 2.14, userId: 1 }),
  ])

  await Promise.all([
    ActivityEntry.create({date: '2021-01-31', distance: 103.77, userId: 2 }),
    ActivityEntry.create({date: '2021-02-01', distance: 2.04, userId: 2 }),
    ActivityEntry.create({date: '2021-02-01', distance: 2.4, userId: 2 }),
    ActivityEntry.create({date: '2021-02-02', distance: 2.38, userId: 2 }),
    ActivityEntry.create({date: '2021-02-03', distance: 1.35, userId: 2 }),
    ActivityEntry.create({date: '2021-02-03', distance: 2.49, userId: 2 }),
    ActivityEntry.create({date: '2021-02-04', distance: 1.93, userId: 2 }),
    ActivityEntry.create({date: '2021-02-06', distance: 4.21, userId: 2 }),
    ActivityEntry.create({date: '2021-02-02', distance: 2.8, userId: 2 }),
    ActivityEntry.create({date: '2021-02-04', distance: 2.09, userId: 2 }),
    ActivityEntry.create({date: '2021-02-05', distance: 0, userId: 2 }),
    ActivityEntry.create({date: '2021-02-07', distance: 4.79, userId: 2 }),
    ActivityEntry.create({date: '2021-02-08', distance: 1.14, userId: 2 }),
    ActivityEntry.create({date: '2021-02-08', distance: 2.4, userId: 2 }),
    ActivityEntry.create({date: '2021-02-10', distance: 2.11, userId: 2 }),
    ActivityEntry.create({date: '2021-02-10', distance: 0.94, userId: 2 }),
    ActivityEntry.create({date: '2021-02-10', distance: 2.03, userId: 2 }),
  ])

  await Promise.all([
    ActivityEntry.create({date: '2021-01-31', distance: 153.83, userId: 3 }),
    ActivityEntry.create({date: '2021-02-01', distance: 4.72, userId: 3 }),
    ActivityEntry.create({date: '2021-02-02', distance: 5.57, userId: 3 }),
    ActivityEntry.create({date: '2021-02-03', distance: 3.85, userId: 3 }),
    ActivityEntry.create({date: '2021-02-04', distance: 5.5, userId: 3 }),
    ActivityEntry.create({date: '2021-02-06', distance: 5.06, userId: 3 }),
    ActivityEntry.create({date: '2021-02-07', distance: 4.82, userId: 3 }),
    ActivityEntry.create({date: '2021-02-08', distance: 3.73, userId: 3 }),
    ActivityEntry.create({date: '2021-02-09', distance: 5.32, userId: 3 }),
    ActivityEntry.create({date: '2021-02-11', distance: 5.12, userId: 3 }),
    ActivityEntry.create({date: '2021-02-12', distance: 3.56, userId: 3 }),
  ])

  await Promise.all([
    ActivityEntry.create({date: '2021-01-31', distance: 100.32, userId: 4 }),
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