/**
 * DocumentHead component.
 */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const DocumentHead: React.FunctionComponent<{ title?: string }> = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
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
