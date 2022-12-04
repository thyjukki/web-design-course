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
    const bcrypt = require("bcryptjs")
    const now = new Date()
    const passwords = ["salasana", "password", "hunter2", "ope123"]
    const salt = bcrypt.genSaltSync()
    const hashedPasswords = await Promise.all(
      passwords.map((passwd) => bcrypt.hash(passwd, salt))
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
      },
      {
        username: "tkari",
        fullName: "Teemu Teekkari",
        email: "t@kari.fi",
        password: hashedPasswords[2],
        createdAt: now,
        updatedAt: now
      },
      {
        username: "ope",
        fullName: "Ope Opettaja",
        email: "ope@op.edu",
        password: hashedPasswords[3],
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("UserRole", [
      {
        userId: 1,
        role: "student",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 1,
        role: "teacher",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 2,
        role: "student",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 2,
        role: "teacher",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 3,
        role: "student",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 3,
        role: "teacher",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 4,
        role: "student",
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 5,
        role: "teacher",
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
        name: "Käsienheiluttelun alkeiskurssi",
        description: "Tällä kurssilla opetellaan heiluttamaan käsiä",
        credits: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "MS-501",
        name: "Todennäköisyys ja tilastotiede",
        description: "Tällä kurssilla opetellaan tilastotiedettä",
        credits: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "MS-502",
        name: "Todennäköisyys ja tilastotiede",
        description: "Tällä kurssilla opetellaan tilastotiedettä",
        credits: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "MS-503",
        name: "Todennäköisyys ja tilastotiede",
        description: "Tällä kurssilla opetellaan tilastotiedettä",
        credits: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "ELEC-101",
        name: "Sähkön alkeet",
        description: "Kurssilla pääsee opettelemaan s¨ähkö toimii",
        credits: 5,
        createdAt: now,
        updatedAt: now
      },
      {
        code: "ELEC-102",
        name: "Sähkömakkaran alkeet",
        description: "Kurssilla pääsee grillamaan makkaraa sähköllä",
        credits: 5,
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
        courseCode: "CS-101",
        startDate: new Date("05 October 2023"),
        endDate: new Date("30 November 2023"),
        signupStart: new Date("01 October 2023"),
        signupEnd: new Date("06 October 2023"),
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
        signupStart: new Date("01 January 2023"),
        signupEnd: new Date("06 January 2023"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 2,
        courseCode: "MS-501",
        startDate: new Date("03 December 2022"),
        endDate: new Date("31 December 2022"),
        signupStart: new Date("29 November 2022"),
        signupEnd: new Date("25 December 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 3,
        courseCode: "MS-502",
        startDate: new Date("05 December 2022"),
        endDate: new Date("24 December 2022"),
        signupStart: new Date("02 December 2022"),
        signupEnd: new Date("19 December 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 2,
        courseCode: "MS-503",
        startDate: new Date("12 December 2022"),
        endDate: new Date("06 January 2023"),
        signupStart: new Date("05 December 2022"),
        signupEnd: new Date("25 December 2022"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 1,
        courseCode: "ELEC-101",
        startDate: new Date("9 December 2023"),
        endDate: new Date("30 December 2023"),
        signupStart: new Date("04 December 2023"),
        signupEnd: new Date("06 December 2023"),
        createdAt: now,
        updatedAt: now
      },
      {
        lecturerId: 1,
        courseCode: "ELEC-102",
        startDate: new Date("09 December 2022"),
        endDate: new Date("30 December 2022"),
        signupStart: new Date("06 December 2022"),
        signupEnd: new Date("09 December 2022"),
        createdAt: now,
        updatedAt: now
      }
    ])

    await queryInterface.bulkInsert("Occasion", [
      {
        instanceId: 1,
        startDate: new Date("05 December 2022 08:00:00"),
        endDate: new Date("26 December 2022 10:00:00"),
        location: "T1",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 1,
        startDate: new Date("1 December 2022 12:00:00"),
        endDate: new Date("29 December 2022 14:00:00"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 2,
        startDate: new Date("05 November 2022  10:00:00"),
        endDate: new Date("17 December 2022 12:00:00"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 2,
        startDate: new Date("05 November 2022 14:00:00"),
        endDate: new Date("17 December 2022 16:00:00"),
        location: "A101",
        type: "Excercise",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 2,
        startDate: new Date("1 December 2022 08:00:00"),
        endDate: new Date("1 December 2022 12:00:00"),
        location: "T2",
        type: "Exam",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 3,
        startDate: new Date("01 November 2022 10:00:00"),
        endDate: new Date("20 December 2022 14:00:00"),
        location: "U420",
        type: "Session",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 4,
        startDate: new Date("05 December 2022  10:00:00"),
        endDate: new Date("26 December 2022 12:00:00"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 4,
        startDate: new Date("31 December 2022 10:00:00"),
        endDate: new Date("31 December 2022 13:00:00"),
        location: "T2",
        type: "Exam",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 5,
        startDate: new Date("05 December 2022  11:00:00"),
        endDate: new Date("26 December 2022 13:00:00"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 5,
        startDate: new Date("08 December 2022  11:00:00"),
        endDate: new Date("29 December 2022 13:00:00"),
        location: "T1",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 5,
        startDate: new Date("29 December 2022 10:00:00"),
        endDate: new Date("29 December 2022 13:00:00"),
        location: "U469",
        type: "Exam",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 6,
        startDate: new Date("07 December 2022  10:00:00"),
        endDate: new Date("28 December 2022 12:00:00"),
        location: "T2",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 6,
        startDate: new Date("09 December 2022  08:00:00"),
        endDate: new Date("30 December 2022 10:00:00"),
        location: "T1",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 6,
        startDate: new Date("02 January 2023 10:00:00"),
        endDate: new Date("02 January 2023 13:00:00"),
        location: "U469",
        type: "Exam",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 7,
        startDate: new Date("9 December 2022 15:00:00"),
        endDate: new Date("9 December 2022 18:00:00"),
        location: "U469",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 7,
        startDate: new Date("16 December 2022 10:00:00"),
        endDate: new Date("16 December 2022 13:00:00"),
        location: "U469",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 7,
        startDate: new Date("23 December 2022 10:00:00"),
        endDate: new Date("23 December 2022 13:00:00"),
        location: "U469",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 7,
        startDate: new Date("23 December 2022 10:00:00"),
        endDate: new Date("23 December 2022 13:00:00"),
        location: "U469",
        type: "Exam",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 8,
        startDate: new Date("8 December 2022 15:00:00"),
        endDate: new Date("8 December 2022 18:00:00"),
        location: "U469",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 8,
        startDate: new Date("15 December 2022 10:00:00"),
        endDate: new Date("15 December 2022 13:00:00"),
        location: "U469",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 8,
        startDate: new Date("22 December 2022 10:00:00"),
        endDate: new Date("22 December 2022 13:00:00"),
        location: "U469",
        type: "Lecture",
        createdAt: now,
        updatedAt: now
      },
      {
        instanceId: 8,
        startDate: new Date("29 December 2022 10:00:00"),
        endDate: new Date("29 December 2022 13:00:00"),
        location: "U469",
        type: "Exam",
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
        userId: 1,
        instanceId: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        userId: 1,
        instanceId: 7,
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
      },
      {
        userId: 2,
        instanceId: 8,
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
      where: {
        code: ["CS-101", "CS-102", "TU-101", "MS-501", "MS-502", "MS-503"]
      }
    })
    await queryInterface.bulkDelete("CourseInstance", {
      where: {
        courseCode: ["CS-101", "CS-102", "TU-101", "MS-501", "MS-502", "MS-503"]
      }
    })
  }
}
