import { BIGINT_ONE, BIGINT_TEN, EPSILON, ONE, PRECISION, TWO, ZERO } from "./constants";
import { integer, make_big_float, number } from "./constructors";
import { is_integer, is_negative, is_zero } from "./predicates";
import { eq, gt, lt } from "./relational";
import { IBigFloat } from "./types";

export function neg(a: IBigFloat): IBigFloat {
  return make_big_float(-a.coefficient, a.exponent);
}

export function abs(a: IBigFloat): IBigFloat {
  return is_negative(a) ? neg(a) : a;
}

function conform_op(op: (a: bigint, b: bigint) => bigint) {
  return function (a: IBigFloat, b: IBigFloat) {
    const differential = a.exponent - b.exponent;
    return differential === 0
      ? make_big_float(op(a.coefficient, b.coefficient), a.exponent)
      : differential > 0
      ? make_big_float(op(a.coefficient * BIGINT_TEN ** BigInt(differential), b.coefficient), b.exponent)
      : make_big_float(op(a.coefficient, b.coefficient * BIGINT_TEN ** BigInt(-differential)), a.exponent);
  };
}

export const add = conform_op((a: bigint, b: bigint) => a + b);
export const sub = conform_op((a: bigint, b: bigint) => a - b);

export function mul(multiplicand: IBigFloat, multiplier: IBigFloat): IBigFloat {
  return make_big_float(multiplicand.coefficient * multiplier.coefficient, multiplicand.exponent + multiplier.exponent);
}

export function div(dividend: IBigFloat, divisor: IBigFloat, precision = PRECISION): IBigFloat {
  if (is_zero(dividend) || is_zero(divisor)) {
    return ZERO;
  }

  let { coefficient, exponent } = dividend;
  exponent -= divisor.exponent;

  if (typeof precision !== "number") {
    precision = number(precision);
  }

  if (exponent > precision) {
    coefficient = coefficient * BIGINT_TEN ** BigInt(exponent - precision);
    exponent = precision;
  }

  coefficient = coefficient / divisor.coefficient;
  return make_big_float(coefficient, exponent);
}

export function sqrt(n: IBigFloat): IBigFloat {
  let x = n;
  let y = ONE;
  /*           n
      _______________________
      |                      | 1
      -----------------------
  */
  while (gt(sub(x, y), EPSILON)) {
    x = div(add(x, y), TWO);
    y = div(n, x);
  }
  return x;
}

export function exponentiation(base: IBigFloat, exp: IBigFloat): IBigFloat {
  if (eq(exp, ZERO)) {
    return ONE;
  }

  if (is_negative(exp)) {
    return div(ONE, exponentiation(base, abs(exp)));
  }

  if (exp.exponent === 0) {
    let result = base;
    let n = 1;
    while (n !== number(exp)) {
      result = mul(result, base);
      n += 1;
    }
    return result;
  }
  if (gt(exp, ONE) || eq(exp, ONE)) {
    const temp = exponentiation(base, div(exp, TWO));
    return mul(temp, temp);
  }
  let low = ZERO;
  let high = ONE;

  let sqr = sqrt(base);
  let acc = sqr;
  let mid = div(high, TWO);

  while (gt(abs(sub(mid, exp)), EPSILON)) {
    sqr = sqrt(sqr);

    if (lt(mid, exp) || eq(mid, exp)) {
      low = mid;
      acc = mul(acc, sqr);
    } else {
      high = mid;
      acc = mul(acc, div(ONE, sqr));
    }
    mid = div(add(low, high), TWO);
  }
  return acc;
}

export function ceil(n: IBigFloat): IBigFloat {
  if (is_integer(n)) {
    return n;
  } else {
    return make_big_float(integer(n).coefficient + BIGINT_ONE, 0);
  }
}

export function floor(n: IBigFloat): IBigFloat {
  return integer(n);
}
