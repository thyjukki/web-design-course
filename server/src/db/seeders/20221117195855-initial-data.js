"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const now = new Date()
    await queryInterface.bulkInsert("User", [
      {
        username: "laaden",
        fullName: "Lassi Knuuttila",
        email: "lassi@lassi.fi",
        password: "test",
        createdAt: now,
        updatedAt: now
      },
      {
        username: "jukki",
        fullName: "Jussi Wahtlström",
        email: "jussi@jussi.fi",
        password: "test",
        createdAt: now,
        updatedAt: now
      },
      {
        username: "aatos",
        fullName: "Aatos Saarinen",
        email: "aatos@aatos.fi",
        password: "test",
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("Course", [
      {
        code: "CS-101",
        name: "Tietotekniikan alkeet",
        description: "Tällä kurssilla opetellaan ATK-taitoja",
        credits: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "CS-102",
        name: "Tietotekniikan jatkokurssi",
        description: "Tällä kurssilla opetellaan lisää ATK-taitoja",
        credits: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "TU-101",
        name: "Käsienheiluttelun alkeet",
        description: "Tällä kurssilla opetellaan heiluttelemaan käsiä",
        credits: 10,
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("CourseInstance", [
      {
        lecturerId: 1,
        courseCode: "CS-101",
        startDate: new Date("05 October 2022"),
        endDate: new Date("30 November 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 1,
        courseCode: "CS-102",
        startDate: new Date("24 December 2022"),
        endDate: new Date("31 December 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 3,
        courseCode: "TU-101",
        startDate: new Date("01 January 2023"),
        endDate: new Date("31 December 2023"),
        createdAt: now,
        updatedAt: now
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("User", {
      where: { username: ["laaden", "jukki", "aatos"] }
    })
    await queryInterface.bulkDelete("Course", {
      where: { code: ["CS-101", "CS-102", "TU-101"] }
    })
    await queryInterface.bulkDelete("CourseInstance", {
      where: { courseCode: ["CS-101", "CS-102", "TU-101"] }
    })
  }
}
