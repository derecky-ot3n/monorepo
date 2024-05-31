import { ROUTES } from "@/routes/routes";
import dayjs from "dayjs";
import pt_BR from 'dayjs/locale/pt-br'
import { redirect } from "next/navigation";

dayjs.locale(pt_BR)

export default function Home() {
  redirect(ROUTES.INQUIRY_CAR)
}
