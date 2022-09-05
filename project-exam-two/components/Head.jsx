import NextHead from 'next/head';

export default function Head({title = "", description = ""}) {
  return(
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""}
        Holidaze
      </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}
