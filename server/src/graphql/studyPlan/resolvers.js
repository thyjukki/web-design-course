import { User, StudyPlan, StudyPlanBlock } from "../../models/index.js"
import { GraphQLError } from "graphql"

export const resolvers = {
  Query: {
    getStudyPlans: async () => {
      return StudyPlan.findAll({
        include: [
          {
            model: User,
            as: "user"
          },
          {
            model: StudyPlanBlock,
            as: "baseBlock"
          }
        ]
      })
    },
    getStudyPlanBlocks: async () => {
      return StudyPlanBlock.findAll({
        include: [
          {
            model: StudyPlanBlock,
            as: "children",
            include: { all: true }
          }
        ]
      })
    }
  },

  Mutation: {
    createStudyPlan: async (_, args) => {
      const user = await User.findOne({
        where: { id: args.userId }
      })
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      return StudyPlan.create(args)
    },
    createStudyPlanBlock: async (_, args) => {
      if (args.parentId) {
        const parentBlock = await StudyPlanBlock.findOne({
          where: { id: args.parentId }
        })

        if (!parentBlock) {
          throw new GraphQLError("Parent block not found", {
            extensions: {
              code: "BAD_USER_INPUT"
            }
          })
        }
      }
      return StudyPlanBlock.create(args, {
        include: [
          {
            model: StudyPlanBlock,
            as: "parent"
          }
        ]
      })
    },
    updateStudyPlanBaseBlock: async (_, { studyPlanId, baseBlockId }) => {
      const baseBlock = await StudyPlanBlock.findOne({
        where: { id: baseBlockId }
      })
      const studyPlan = await StudyPlan.findOne({
        where: { id: studyPlanId }
      })

      if (!baseBlock) {
        throw new GraphQLError("Parent block not found", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      if (!studyPlan) {
        throw new GraphQLError("Study plan not found", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      await studyPlan.update({ baseBlockId: baseBlock.id })
      return studyPlan.reload({
        include: [
          {
            model: StudyPlanBlock,
            as: "baseBlock"
          },
          {
            model: User,
            as: "user"
          }
        ]
      })
    }
  }
}
