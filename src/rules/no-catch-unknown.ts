import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "noCatchUnknown"

export const noCatchUnknown = createRule<Options, MessageIds>({
  name: "no-catch-unknown",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow explicit `unknown` type annotation on catch bindings. Pair with no-throw-literal to guarantee catch variables are always Error instances.",
    },
    schema: [],
    messages: {
      noCatchUnknown:
        "Do not annotate catch bindings as `unknown`. Pair this plugin's no-throw-literal rule to guarantee the caught value is always an Error.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CatchClause(node: TSESTree.CatchClause) {
        const param = node.param
        if (!param) return
        if (param.type !== AST_NODE_TYPES.Identifier) return
        const typeAnnotation = param.typeAnnotation
        if (typeAnnotation !== undefined && typeAnnotation.typeAnnotation.type === AST_NODE_TYPES.TSUnknownKeyword) {
          context.report({ node: param, messageId: "noCatchUnknown" })
        }
      },
    }
  },
})
