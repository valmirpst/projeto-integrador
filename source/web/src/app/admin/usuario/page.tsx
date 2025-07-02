import { Metadata } from "next";
import dynamic from "next/dynamic";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default function Reserva() {
  return <ClientSide />;
}
