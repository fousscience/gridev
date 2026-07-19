import { redirect } from "next/navigation";

/** Ancienne URL — redirection vers Opportunités */
export default function CollaborationRedirect() {
  redirect("/opportunites");
}
