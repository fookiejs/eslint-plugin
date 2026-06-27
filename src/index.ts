import { noAny } from "./rules/no-any.js"
import { noComments } from "./rules/no-comments.js"
import { noEmptyString } from "./rules/no-empty-string.js"
import { noGenericNames } from "./rules/no-generic-names.js"
import { noImplicitCoercion } from "./rules/no-implicit-coercion.js"
import { noThrowLiteral } from "./rules/no-throw-literal.js"
import { noCatchUnknown } from "./rules/no-catch-unknown.js"
import { noFloatingPromise } from "./rules/no-floating-promise.js"
import { noParamReassign } from "./rules/no-param-reassign.js"
import { requireExplicitReturnType } from "./rules/require-explicit-return-type.js"
import { noArrayMutatingMethods } from "./rules/no-array-mutating-methods.js"
import { noDelete } from "./rules/no-delete.js"
import { noMutableExports } from "./rules/no-mutable-exports.js"
import { preferIncludes } from "./rules/prefer-includes.js"
import { noLoopFunc } from "./rules/no-loop-func.js"
import { consistentReturn } from "./rules/consistent-return.js"
import { noShadow } from "./rules/no-shadow.js"
import { noCatchInstanceof } from "./rules/no-catch-instanceof.js"
import { noEval } from "./rules/no-eval.js"
import { noProcessEnv } from "./rules/no-process-env.js"
import { preferReadonlyParams } from "./rules/prefer-readonly-params.js"
import { noForIn } from "./rules/no-for-in.js"
import { noAsyncWithoutAwait } from "./rules/no-async-without-await.js"
import { noClassMutation } from "./rules/no-class-mutation.js"
import { exhaustiveSwitch } from "./rules/exhaustive-switch.js"
import { noRequire } from "./rules/no-require.js"
import { noDefaultExport } from "./rules/no-default-export.js"
import { requirePrivateConstructor } from "./rules/require-private-constructor.js"
import { noUnknown } from "./rules/no-unknown.js"
import { requireCurly } from "./rules/require-curly.js"
import { noLegacyGlobals } from "./rules/no-legacy-globals.js"
import { noNewWrappers } from "./rules/no-new-wrappers.js"
import { noNonNullAssertion } from "./rules/no-non-null-assertion.js"
import { noNullUndefined } from "./rules/no-null-undefined.js"
import { noNullishOperators } from "./rules/no-nullish-operators.js"
import { noPlaceholderNames } from "./rules/no-placeholder-names.js"
import { noStringConcat } from "./rules/no-string-concat.js"
import { noTypeAssertion } from "./rules/no-type-assertion.js"
import { noTypeof } from "./rules/no-typeof.js"
import { requireBooleanCondition } from "./rules/require-boolean-condition.js"
import { sameTypeComparison } from "./rules/same-type-comparison.js"

const rules = {
  "no-placeholder-names": noPlaceholderNames,
  "no-generic-names": noGenericNames,
  "no-null-undefined": noNullUndefined,
  "no-comments": noComments,
  "require-boolean-condition": requireBooleanCondition,
  "same-type-comparison": sameTypeComparison,
  "no-any": noAny,
  "no-type-assertion": noTypeAssertion,
  "no-non-null-assertion": noNonNullAssertion,
  "no-nullish-operators": noNullishOperators,
  "no-empty-string": noEmptyString,
  "no-typeof": noTypeof,
  "no-legacy-globals": noLegacyGlobals,
  "no-new-wrappers": noNewWrappers,
  "no-string-concat": noStringConcat,
  "no-implicit-coercion": noImplicitCoercion,
  "no-throw-literal": noThrowLiteral,
  "no-catch-unknown": noCatchUnknown,
  "no-floating-promise": noFloatingPromise,
  "no-param-reassign": noParamReassign,
  "require-explicit-return-type": requireExplicitReturnType,
  "no-array-mutating-methods": noArrayMutatingMethods,
  "no-delete": noDelete,
  "no-mutable-exports": noMutableExports,
  "prefer-includes": preferIncludes,
  "no-loop-func": noLoopFunc,
  "consistent-return": consistentReturn,
  "no-shadow": noShadow,
  "no-catch-instanceof": noCatchInstanceof,
  "no-eval": noEval,
  "no-process-env": noProcessEnv,
  "prefer-readonly-params": preferReadonlyParams,
  "no-for-in": noForIn,
  "no-async-without-await": noAsyncWithoutAwait,
  "no-class-mutation": noClassMutation,
  "exhaustive-switch": exhaustiveSwitch,
  "no-require": noRequire,
  "no-default-export": noDefaultExport,
  "require-private-constructor": requirePrivateConstructor,
  "no-unknown": noUnknown,
  "require-curly": requireCurly,
}

const configs: Record<string, unknown> = {}

const plugin = {
  meta: { name: "fookie-eslint-plugin", version: "0.1.0" },
  rules,
  configs,
}

const recommendedRules = {
  "fookie/no-placeholder-names": "error",
  "fookie/no-generic-names": "warn",
  "fookie/no-null-undefined": "error",
  "fookie/no-comments": "error",
  "fookie/require-boolean-condition": "error",
  "fookie/same-type-comparison": "error",
  "fookie/no-any": "error",
  "fookie/no-type-assertion": "error",
  "fookie/no-non-null-assertion": "error",
  "fookie/no-nullish-operators": "error",
  "fookie/no-empty-string": "error",
  "fookie/no-typeof": "error",
  "fookie/no-legacy-globals": "error",
  "fookie/no-new-wrappers": "error",
  "fookie/no-string-concat": "error",
  "fookie/no-implicit-coercion": "error",
  "fookie/no-throw-literal": "error",
  "fookie/no-catch-unknown": "error",
  "fookie/no-floating-promise": "error",
  "fookie/no-param-reassign": "error",
  "fookie/require-explicit-return-type": "error",
  "fookie/no-array-mutating-methods": "error",
  "fookie/no-delete": "error",
  "fookie/no-mutable-exports": "error",
  "fookie/prefer-includes": "error",
  "fookie/no-loop-func": "error",
  "fookie/consistent-return": "error",
  "fookie/no-shadow": "error",
  "fookie/no-catch-instanceof": "error",
  "fookie/no-eval": "error",
  "fookie/no-process-env": "error",
  "fookie/prefer-readonly-params": "error",
  "fookie/no-for-in": "error",
  "fookie/no-async-without-await": "error",
  "fookie/no-class-mutation": "error",
  "fookie/exhaustive-switch": "error",
  "fookie/no-require": "error",
  "fookie/no-default-export": "error",
  "fookie/require-private-constructor": "error",
  "fookie/no-unknown": "error",
  "fookie/require-curly": "error",
}

configs["recommended"] = {
  plugins: { fookie: plugin },
  rules: recommendedRules,
}

configs["recommended-legacy"] = {
  plugins: ["fookie"],
  rules: recommendedRules,
}

export default plugin
