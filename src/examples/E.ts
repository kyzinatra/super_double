import { writeFileSync } from "fs";
import { BigFloat } from "../bigfloat";
import { set_precision, string } from "../mod";

export function factor(n: number) {
  if (n === 0 || n === 1) return new BigFloat(1);
  let result = new BigFloat(1);
  for (let i = 2; i <= n; i++) {
    result = result.mul(i);
  }
  return result;
}

export function EEXample() {
  set_precision(-100000);
  console.time("EEXample");
  let result = new BigFloat(1);
  let dcof = new BigFloat(1);
  for (let i = 1; i < 26000; i++) {
    console.log(i / 260 + "%", i);

    dcof = dcof.div(i);
    if (dcof.toString() === "0") break;
    result = result.add(dcof);
  }
  writeFileSync("./results/E.txt", result.toString());
  console.timeEnd("EEXample");
}
