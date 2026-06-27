# fookie-eslint

> `fookie-eslint-plugin` — Opinionated ESLint rules for TypeScript enforcing explicit types, immutable data flow, and zero JS gotchas.

## Installation

```bash
npm install --save-dev fookie-eslint-plugin
```

## Setup

```js
import fookie from 'fookie-eslint-plugin'

export default [
  fookie.configs['recommended'],
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
]
```

---

## Rules

### Type Safety

#### `no-any`
Disallow the `any` type.
```ts
// ❌
const user: any = fetchUser(url)

// ✅
const user: User = await fetchUser(url)
```

#### `no-type-assertion`
Disallow `as` type assertions.
```ts
// ❌
const user = response as User

// ✅
function isUser(value: User | Response): value is User {
  return value instanceof User
}
```

#### `no-non-null-assertion`
Disallow non-null assertions (`!`).
```ts
// ❌
getElement('app')!.innerHTML = ''

// ✅
const element = getElement('app')
element.innerHTML = ''
```

#### `same-type-comparison`
Both sides of `===` must have the same TypeScript type.
```ts
// ❌
if (count === '5') { }

// ✅
if (count === 5) { }
```

---

### Error Handling

#### `no-throw-literal`
Only `Error` instances can be thrown.
```ts
// ❌
throw 'something went wrong'
throw { message: 'oops' }

// ✅
throw new Error('something went wrong')
```

#### `no-catch-unknown`
Disallow explicit `unknown` annotation on catch bindings.
```ts
// ❌
catch (e: unknown) { }

// ✅
catch (e) {
  console.log(e.message)
}
```

#### `no-catch-instanceof`
Disallow `instanceof Error` checks inside catch blocks. Pair with `no-throw-literal` — `e` is always an `Error`.
```ts
// ❌
catch (e) {
  if (e instanceof Error) console.log(e.message)
}

// ✅
catch (e) {
  console.log(e.message)
}
```

#### `no-floating-promise`
Promises must be awaited, returned, or `.catch()`-handled.
```ts
// ❌
saveUser(user)

// ✅
await saveUser(user)
```

---

### Immutability

#### `no-array-mutating-methods`
Disallow in-place array mutation methods.
```ts
// ❌
items.sort()
items.reverse()
items.splice(0, 1)

// ✅
[...items].sort()
[...items].reverse()
items.filter((item, index) => index !== 0)
```

#### `no-param-reassign`
Disallow reassignment of function parameters.
```ts
// ❌
function normalize(user: User): void {
  user = sanitize(user)
}

// ✅
function normalize(user: User): User {
  return sanitize(user)
}
```

#### `no-delete`
Disallow the `delete` operator.
```ts
// ❌
delete record.key

// ✅
const { key, ...rest } = record
```

#### `no-mutable-exports`
Disallow exporting `let` variables.
```ts
// ❌
export let count = 0

// ✅
export const count = 0
```

#### `no-class-mutation`
Disallow `this.prop =` assignments outside the constructor.
```ts
// ❌
class Store {
  update(): void { this.value = 42 }
}

// ✅
class Store {
  private constructor(readonly value: number) {}
  withValue(newValue: number): Store { return new Store(newValue) }
}
```

#### `prefer-readonly-params`
Array parameters must be typed as `readonly`.
```ts
// ❌
function sum(nums: number[]): number

// ✅
function sum(nums: readonly number[]): number
```

---

### Control Flow

#### `require-boolean-condition`
Conditions in `if`/`while`/ternary must be explicitly boolean.
```ts
// ❌
if (user) { }
if (items.length) { }

// ✅
if (user.isActive === true) { }
if (items.length > 0) { }
```

#### `exhaustive-switch`
Switch over union types must cover all members without a `default` fallback.
```ts
// ❌
type Status = 'active' | 'inactive' | 'banned'
switch (status) {
  case 'active': return 'Active'
  case 'inactive': return 'Inactive'
}

// ✅
switch (status) {
  case 'active': return 'Active'
  case 'inactive': return 'Inactive'
  case 'banned': return 'Banned'
}
```

#### `consistent-return`
Functions must either always or never return a value.
```ts
// ❌
function getLabel(status: string) {
  if (status === 'active') return 'Active'
}

// ✅
function getLabel(status: string): string {
  if (status === 'active') return 'Active'
  return 'Unknown'
}
```

#### `no-async-without-await`
Async functions must contain at least one `await`.
```ts
// ❌
async function getUser(): Promise<User> {
  return db.find()
}

// ✅
async function getUser(): Promise<User> {
  return await db.find()
}
```

#### `no-loop-func`
Disallow function definitions inside loops.
```ts
// ❌
for (let count = 0; count < 3; count++) {
  setTimeout(() => console.log(count), 0)
}

// ✅
for (const item of items) {
  process(item)
}
```

---

### Naming

#### `no-generic-names`
Disallow vague names like `data`, `info`, `temp`, `result`, `obj`.
```ts
// ❌
const data = await fetchUser()
const temp = data.name

// ✅
const user = await fetchUser()
const displayName = user.name
```

#### `no-placeholder-names`
Disallow single-letter variable names.
```ts
// ❌
items.map(x => x.name)

// ✅
items.map(item => item.name)
```

#### `no-shadow`
Disallow variable declarations that shadow outer scope variables.
```ts
// ❌
const user = getUser()
users.map(user => user.name)

// ✅
const currentUser = getUser()
users.map(member => member.name)
```

---

### JS Gotchas

#### `no-for-in`
Disallow `for...in` — it iterates the prototype chain.
```ts
// ❌
for (const key in config) { }

// ✅
for (const key of Object.keys(config)) { }
```

#### `no-implicit-coercion`
Disallow implicit type coercions.
```ts
// ❌
const parsed = +'42'
const flag = !!value

// ✅
const parsed = Number('42')
const flag = Boolean(value)
```

#### `no-typeof`
Disallow `typeof` checks — use `instanceof` or type predicates.
```ts
// ❌
if (typeof response === 'string') { }

// ✅
if (response instanceof HttpError) { }
```

#### `no-eval`
Disallow `eval()` and indirect eval patterns.
```ts
// ❌
eval('console.log(1)')
```

#### `no-new-wrappers`
Disallow `new String()`, `new Number()`, `new Boolean()`.
```ts
// ❌
const greeting = new String('hello')

// ✅
const greeting = 'hello'
```

#### `prefer-includes`
Require `.includes()` over `.indexOf()` comparisons.
```ts
// ❌
items.indexOf('target') !== -1

// ✅
items.includes('target')
```

#### `no-string-concat`
Disallow `+` string concatenation. Use template literals.
```ts
// ❌
'Hello, ' + name + '!'

// ✅
`Hello, ${name}!`
```

#### `no-legacy-globals`
Disallow `window`, `document`, `global` direct access.
```ts
// ❌
window.addEventListener('click', handler)

// ✅
addEventListener('click', handler)
```

---

### Modules

#### `no-require`
Disallow `require()`. Use ES `import`.
```ts
// ❌
const fs = require('fs')

// ✅
import fs from 'fs'
```

#### `no-default-export`
Disallow default exports. Use named exports.
```ts
// ❌
export default function handler() { }

// ✅
export function handler() { }
```

#### `no-process-env`
Disallow direct `process.env` access. Use a typed config module.
```ts
// ❌
const port = process.env.PORT

// ✅
import { config } from './config.js'
const port = config.port
```

---

### Classes

#### `require-private-constructor`
Class constructors must be `private`. Use static factory methods.
```ts
// ❌
class User {
  constructor(public name: string) {}
}

// ✅
class User {
  private constructor(public name: string) {}
  static create(name: string): User { return new User(name) }
}
```

#### `no-class-mutation`
Disallow `this.prop =` outside the constructor.
```ts
// ❌
class Counter {
  increment(): void { this.value++ }
}

// ✅
class Counter {
  private constructor(readonly value: number) {}
  increment(): Counter { return new Counter(this.value + 1) }
}
```

---

### Functions

#### `require-explicit-return-type`
Exported functions and public class methods must declare return types.
```ts
// ❌
export function getUser(id: string) {
  return db.find(id)
}

// ✅
export function getUser(id: string): Promise<User> {
  return db.find(id)
}
```

#### `no-comments`
Disallow code comments — write self-documenting code instead.
```ts
// ❌
const result = await get(id)

// ✅
const user = await fetchUserById(id)
```

#### `no-null-undefined`
Disallow `null`, `undefined`, and `void` as values. Use optional types with implicit return.
```ts
// ❌
function find(id: string): User | null {
  return null
}

// ✅
function find(id: string): User | undefined {
  return records.get(id)
}
```
