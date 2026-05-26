import { redirect } from "next/navigation";

export default function BibleRoot() {
  // Default: ACF Genesis 1
  redirect("/bible/acf/genesis/1");
}
