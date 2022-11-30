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
    const jwt = require("jsonwebtoken")
    const now = new Date()
    const passwords = ["salasana", "password", "hunter2"]
    const hashedPasswords = await Promise.all(
      passwords.map((passwd) => jwt.sign(passwd, process.env.TOKEN_KEY))
    )

    await queryInterface.bulkInsert("User", [
      {
        username: "laaden",
        fullName: "Lassi Knuuttila",
        email: "lassi@lassi.fi",
        password: hashedPasswords[0],
        createdAt: now,
        updatedAt: now
      },
      {
        username: "jukki",
        fullName: "Jussi Wahtlström",
        email: "jussi@jussi.fi",
        password: hashedPasswords[1],
        createdAt: now,
        updatedAt: now
      },
      {
        username: "aatos",
        fullName: "Aatos Saarinen",
        email: "aatos@aatos.fi",
        password: hashedPasswords[2],
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
        signupStart: new Date("01 October 2022"),
        signupEnd: new Date("06 October 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 1,
        courseCode: "CS-102",
        startDate: new Date("24 December 2022"),
        endDate: new Date("31 December 2022"),
        signupStart: new Date("05 December 2022"),
        signupEnd: new Date("25 December 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 3,
        courseCode: "TU-101",
        startDate: new Date("01 January 2023"),
        endDate: new Date("31 December 2023"),
        signupStart: new Date("01 January 2022"),
        signupEnd: new Date("06 January 2022"),
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("Occasion", [
      {
        instanceId: 1,
        startDate: new Date("05 October 2022"),
        endDate: new Date("30 November 2022"),
        location: "T1",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 1,
        startDate: new Date("1 December 2022"),
        endDate: new Date("30 December 2022"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 2,
        startDate: new Date("05 October 2022"),
        endDate: new Date("30 November 2022"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 2,
        startDate: new Date("05 October 2022"),
        endDate: new Date("30 November 2022"),
        location: "A101",
        type: "Excercise",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 2,
        startDate: new Date("1 December 2022"),
        endDate: new Date("1 December 2022"),
        location: "T2",
        type: "Exam",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 3,
        startDate: new Date("01 October 2022"),
        endDate: new Date("15 November 2022"),
        location: "U420",
        type: "Session",
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("StudyPlanBlock", [
      {
        name: "Tietotekniikan kandiohjelma",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Pakolliset kurssit",
        parentId: 1,
        createdAt: now,
        updatedAt: now
      }
    ])
    await queryInterface.bulkInsert("StudyPlan", [
      {
        name: "Jussin Kandi",
        baseBlockId: 1,
        userId: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        name: "Lassin Kandi",
        userId: 1,
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("CourseEnrollment", [
      {
        userId: 1,
        instanceId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 2,
        instanceId: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 2,
        instanceId: 1,
        blockId: 2,
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
