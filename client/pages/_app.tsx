import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="font-NotoSans">
      <RecoilRoot>
        <Head>
          <title>toyMapleApp</title>
        </Head>
        <Layout>
          <div className="bg-white min-h-screen p-8 ">
            <Component {...pageProps} />
          </div>
        </Layout>
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
