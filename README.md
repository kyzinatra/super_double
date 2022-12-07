# Basic usage

```typescript
import { BigFloat } from "bigfloat.js";

new BigFloat("2").sqrt().toString(); // "1.4142"
```

### The evaluate() function

```typescript
evaluate(expression: string, precision?: number): string | boolean
```

```typescript
import { evaluate } from "bigfloat.js";

0.1 + 0.2 === 0.3; // false
evaluate("0.1 + 0.2 == 0.3"); // true

0.1 + 0.2; // 0.30000000000000004
evaluate("0.1 + 0.2"); // "0.3"

1 + Number.EPSILON / 2; // 1
evaluate(`1 + ${Number.EPSILON / 2}`); // "1.00000000000000011102230246251565"

evaluate("1 + 2.220446049250313e-16"); // "1.0000000000000002220446049250313"

evaluate(`4 >= ${Math.PI}`); // true
```

### Change precision

```typescript
import { BigFloat, set_precision } from "bigfloat.js";

new BigFloat(2).sqrt().toString(); // "1.4142"
set_precision(-10);
new BigFloat(2).sqrt().toString(); // "1.4142135623"
```
