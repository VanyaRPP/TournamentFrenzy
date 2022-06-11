import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function About() {

  return (
    <>
      <div className="mb-5" data-testid="external">
        <h1 data-testid="external-title">About ME</h1>
        <div data-testid="external-text">
          <p className="lead">
            AboutmeAboutmeAboutmeAboutmeAboutmeAboutmeAboutme
          </p>
          <p>
            AboutmeAboutmeAboutmeAboutmeAboutmeAboutmeAboutmeAboutme
          </p>
        </div>
      </div>
    </>
  );
}

export default withPageAuthRequired(About, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
