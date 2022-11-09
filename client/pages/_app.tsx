import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Head>
          <title>toyMapleApp</title>
        </Head>
        <Layout>
          <div className="bg-color-2 min-h-screen p-8 ">
            <Component {...pageProps} />
          </div>
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
