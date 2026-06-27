import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "legacyGlobal" | "noArguments"

function getBannedReplacement(name: string): string | false {
  if (name === "parseInt") return "Number.parseInt(str, 10)"
  if (name === "parseFloat") return "Number(str)"
  if (name === "isNaN") return "Number.isNaN(x)"
  if (name === "isFinite") return "Number.isFinite(x)"
  if (name === "eval") return "never — redesign without eval"
  return false
}

export const noLegacyGlobals = createRule<Options, MessageIds>({
  name: "no-legacy-globals",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow legacy global functions: parseInt, parseFloat, isNaN, isFinite, eval, arguments",
    },
    schema: [],
    messages: {
      legacyGlobal: "Do not use global '{{name}}'. Use '{{replacement}}' instead.",
      noArguments: "Do not use 'arguments'. Use rest parameters (...args) instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (node.callee.type !== AST_NODE_TYPES.Identifier) return
        const name = node.callee.name
        const replacement = getBannedReplacement(name)
        if (replacement !== false) {
          context.report({
            node: node.callee,
            messageId: "legacyGlobal",
            data: { name, replacement },
          })
        }
      },

      Identifier(node: TSESTree.Identifier) {
        if (node.name !== "arguments") return
        const parent = node.parent
        if (parent.type === AST_NODE_TYPES.MemberExpression && parent.property === node) return
        if (parent.type === AST_NODE_TYPES.Property && parent.key === node) return
        context.report({ node, messageId: "noArguments" })
      },
    }
  },
})
