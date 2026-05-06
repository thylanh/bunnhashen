import type { AppProps } from "next/app";
import { Nunito, Quicksand, Rye } from "next/font/google";
import { Toaster } from "sonner";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";

const fontHeading = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});
const fontBody = Quicksand({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});
const fontMono = Nunito({
  weight: ["400", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} font-sans`}>
      <Head>
        <title>Bún Chú Béo</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Toaster position="top-right" closeButton richColors />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
