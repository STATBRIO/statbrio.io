import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, keywords }) {
  const fullTitle = title ? `${title} | Statbrio` : 'Statbrio';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
