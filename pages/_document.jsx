import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Cometa Personalização - Personalize camisas, canecas, copos e muito mais com nosso editor 3D interativo." />
        <meta name="keywords" content="personalização, camisas, canecas, editor 3D, custom" />
        <meta property="og:title" content="Cometa Personalização" />
        <meta property="og:description" content="Crie produtos únicos e personalizados com nosso editor 3D." />
        <meta property="og:image" content="https://cometapersonalizacao.shop/og-image.png" />
        <meta property="og:url" content="https://cometapersonalizacao.shop" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
