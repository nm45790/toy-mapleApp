import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <RecoilRoot>
      <Head>
        <title>toyMapleApp</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
