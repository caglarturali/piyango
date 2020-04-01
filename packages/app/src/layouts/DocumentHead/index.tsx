/**
 * DocumentHead component.
 */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export interface DocumentHeadProps {
  title?: string;
}

const DocumentHead: React.FunctionComponent<DocumentHeadProps> = ({
  title,
}) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

DocumentHead.defaultProps = {
  title: 'Piyango.online',
};

DocumentHead.propTypes = {
  title: PropTypes.string,
};

export default DocumentHead;
