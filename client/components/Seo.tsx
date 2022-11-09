import Head from "next/head";

type TitleProps={
    title:string
}

export default function Seo({ title }:TitleProps) {
  const titleContent= `${title} | MapleApp `
  return (
    <Head>
      <title>{titleContent}</title>
    </Head>
  );
}
