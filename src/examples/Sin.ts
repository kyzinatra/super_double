import { writeFileSync } from "fs";
import { BigFloat } from "../bigfloat";
import { set_precision } from "../mod";
import { factor } from "./E";

export function sin(x: number) {
  set_precision(-1000000);
  console.time("sin");
  let result = new BigFloat(0);
  for (let i = 1; i < 40000; i++) {
    console.log(i);
    let coof = new BigFloat(x).pow(2 * i - 1).div(factor(2 * i - 1));
    if (coof.toString() === "0") break;
    if ((i + 1) % 2 === 0) {
      result = result.add(coof);
    } else result = result.sub(coof);
  }
  writeFileSync("./results/sin.txt", result.toString());
  console.timeEnd("sin");
}
