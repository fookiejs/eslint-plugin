import { ESLintUtils, TSESTree } from "@typescript-eslint/utils"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "noAny"

export const noAny = createRule<Options, MessageIds>({
  name: "no-any",
  meta: {
    type: "problem",
    docs: { description: "Disallow the any type" },
    schema: [],
    messages: { noAny: "Do not use 'any'. Use a specific type instead." },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSAnyKeyword(node: TSESTree.TSAnyKeyword) {
        context.report({ node, messageId: "noAny" })
      },
    }
  },
})
