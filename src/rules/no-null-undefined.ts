import { ESLintUtils, TSESTree } from "@typescript-eslint/utils"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "noNull" | "noUndefined" | "noVoidExpr"

export const noNullUndefined = createRule<Options, MessageIds>({
  name: "no-null-undefined",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow null, undefined, and void expressions as values",
    },
    schema: [],
    messages: {
      noNull:
        "Do not use null. Model absence with optional types (T | undefined or T?) instead.",
      noUndefined:
        "Do not use undefined as a value. Return nothing or use optional types instead.",
      noVoidExpr:
        "Do not use void expressions. void 0 is just undefined, which is also forbidden here.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      "Literal[value=null]"(node: TSESTree.Literal) {
        context.report({ node, messageId: "noNull" })
      },

      "Identifier[name='undefined']"(node: TSESTree.Identifier) {
        context.report({ node, messageId: "noUndefined" })
      },

      UnaryExpression(node: TSESTree.UnaryExpression) {
        if (node.operator === "void") {
          context.report({ node, messageId: "noVoidExpr" })
        }
      },
    }
  },
})
