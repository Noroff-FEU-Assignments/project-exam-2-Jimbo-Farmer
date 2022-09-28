import NextHead from 'next/head';

/**
 * Generates html head.  
 * @Component
 * @param {string} title -title description
 * @param {string} description -meta description
 * @returns {HTMLElement}
 */

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
