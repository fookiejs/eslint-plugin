import { ESLintUtils, TSESTree } from "@typescript-eslint/utils"
import * as ts from "typescript"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "requireBoolean"

function isPurelyBoolean(type: ts.Type): boolean {
  if ((type.flags & (ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral)) !== 0) return true
  if (type.isUnion()) return type.types.every(isPurelyBoolean)
  return false
}

export const requireBooleanCondition = createRule<Options, MessageIds>({
  name: "require-boolean-condition",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require conditions in if/while/ternary to be explicitly boolean, not truthy/falsy",
    },
    schema: [],
    messages: {
      requireBoolean:
        "Condition has type '{{type}}'. Use an explicit boolean expression (e.g. x !== undefined, x.length > 0).",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context)
    const checker = services.program.getTypeChecker()

    function check(conditionNode: TSESTree.Expression): void {
      const tsNode = services.esTreeNodeToTSNodeMap.get(conditionNode)
      const type = checker.getTypeAtLocation(tsNode)

      if ((type.flags & ts.TypeFlags.Any) !== 0) return

      if (!isPurelyBoolean(type)) {
        context.report({
          node: conditionNode,
          messageId: "requireBoolean",
          data: { type: checker.typeToString(type) },
        })
      }
    }

    return {
      "IfStatement"(node: TSESTree.IfStatement) {
        check(node.test)
      },
      "WhileStatement"(node: TSESTree.WhileStatement) {
        check(node.test)
      },
      "DoWhileStatement"(node: TSESTree.DoWhileStatement) {
        check(node.test)
      },
      "ForStatement"(node: TSESTree.ForStatement) {
        if (node.test !== null) check(node.test)
      },
      "ConditionalExpression"(node: TSESTree.ConditionalExpression) {
        check(node.test)
      },
    }
  },
})
