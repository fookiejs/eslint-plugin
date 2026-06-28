import { ESLintUtils, TSESTree } from "@typescript-eslint/utils"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "noNanArrayIndexOf"

function isNaNNode(node: TSESTree.Node): boolean {
  return node.type === "Identifier" && node.name === "NaN"
}

export const noNanArrayIndexOf = createRule<Options, MessageIds>({
  name: "no-nan-array-indexof",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow array.indexOf(NaN) which always returns -1. Use array.includes(NaN) or array.findIndex(Number.isNaN) instead.",
    },
    schema: [],
    messages: {
      noNanArrayIndexOf:
        "array.indexOf(NaN) always returns -1 because NaN !== NaN. Use array.includes(NaN) or array.findIndex(Number.isNaN) instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "indexOf" &&
          node.arguments.length >= 1 &&
          isNaNNode(node.arguments[0]!)
        ) {
          context.report({ node, messageId: "noNanArrayIndexOf" })
        }
      },
    }
  },
})
