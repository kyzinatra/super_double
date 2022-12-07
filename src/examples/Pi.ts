import { writeFileSync } from "fs";
import { BigFloat } from "../bigfloat";
import { set_precision } from "../constants";
import { factor } from "./E";

export function PI() {
  set_precision(-10000);
  console.time("PI");
  let result = new BigFloat(0);
  const coof = new BigFloat(1).div(426880).div(new BigFloat(10005).sqrt());

  for (let i = 0; i < 100000; i++) {
    const up = new BigFloat(13591409).plus(new BigFloat(545140134).mul(i)).mul(factor(6 * i));
    const down = factor(3 * i)
      .mul(factor(i).pow(3))
      .mul(new BigFloat(-640320).pow(3 * i));
    const plusTo = up.div(down);
    if (plusTo.eq(0)) break;
    result = result.plus(plusTo);
  }
  writeFileSync("./results/pi.txt", new BigFloat(1).div(result.mul(coof)).toString());
  console.timeEnd("PI");
}
