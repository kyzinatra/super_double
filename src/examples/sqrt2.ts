import { writeFileSync } from "fs";
import { BigFloat } from "../bigfloat";
import { set_precision } from "../mod";

export function sqrt2Example() {
  set_precision(-40000); // e = 10^(-40000)
  console.time("SQRT2 ");
  writeFileSync("./results/SQ2_test.txt", new BigFloat("2").sqrt().toString());
  console.timeEnd("SQRT5");
}
