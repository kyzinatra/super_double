import { set_precision, BigFloat } from "../mod";

export function test() {
  set_precision(-15);

  console.log(new BigFloat("2").pow(5).toString());
}
