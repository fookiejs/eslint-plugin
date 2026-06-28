import { ESLintUtils, TSESTree } from "@typescript-eslint/utils"
import * as ts from "typescript"

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/fookiejs/eslint-plugin-fookie/blob/main/docs/rules/${name}.md`,
)

type Options = []
type MessageIds = "nonExhaustiveSwitch"

function getLiteralValue(type: ts.Type): string | number | boolean | null {
  if (type.flags & ts.TypeFlags.StringLiteral) return (type as ts.StringLiteralType).value
  if (type.flags & ts.TypeFlags.NumberLiteral) return (type as ts.NumberLiteralType).value
  if (type.flags & ts.TypeFlags.BooleanLiteral) {
    return (type as ts.Type & { intrinsicName: string }).intrinsicName === "true"
  }
  return null
}

function getUnionMembers(type: ts.Type): Set<string | number | boolean> {
  const members = new Set<string | number | boolean>()
  if (type.isUnion()) {
    for (const t of type.types) {
      const val = getLiteralValue(t)
      if (val !== null) members.add(val)
    }
  } else {
    const val = getLiteralValue(type)
    if (val !== null) members.add(val)
  }
  return members
}

function getCaseValues(cases: TSESTree.SwitchCase[], checker: ts.TypeChecker, services: ReturnType<typeof ESLintUtils.getParserServices>): Set<string | number | boolean> {
  const values = new Set<string | number | boolean>()
  for (const c of cases) {
    if (!c.test) continue
    const t = c.test
    if (t.type === "Literal") {
      if (t.value !== null && t.value !== undefined) {
        values.add(t.value as string | number | boolean)
      }
    } else {
      const tsNode = services.esTreeNodeToTSNodeMap.get(t)
      const type = checker.getTypeAtLocation(tsNode)
      const val = getLiteralValue(type)
      if (val !== null) values.add(val)
    }
  }
  return values
}

export const exhaustiveSwitch = createRule<Options, MessageIds>({
  name: "exhaustive-switch",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require switch statements over union types to handle all cases without a default fallback",
    },
    schema: [],
    messages: {
      nonExhaustiveSwitch:
        "Switch is not exhaustive. Missing cases: {{missing}}. Handle all union members explicitly instead of relying on default.",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context)
    const checker = services.program.getTypeChecker()

    return {
      SwitchStatement(node: TSESTree.SwitchStatement) {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node.discriminant)
        const type = checker.getTypeAtLocation(tsNode)

        const unionMembers = getUnionMembers(type)
        if (unionMembers.size === 0) return

        const caseValues = getCaseValues(node.cases, checker, services)

        const missing = [...unionMembers].filter((m) => !caseValues.has(m))
        if (missing.length > 0) {
          context.report({
            node,
            messageId: "nonExhaustiveSwitch",
            data: { missing: missing.map((m) => JSON.stringify(m)).join(", ") },
          })
        }
      },
    }
  },
})
