import Head from "next/head";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsAppNextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  );
}
