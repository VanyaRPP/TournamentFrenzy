import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


import ErrorMessage from '../../../components/ErrorMessage';
import Loading from '../../../components/Loading';
import NTForm from '../../../components/NewTournamentForm';

function Create() {

  return (
    <>
      <div className="mb-5" data-testid="external">
        <h1 data-testid="external-title">Create NEW tournament</h1>
        <div data-testid="external-text">
          {/* <p className="lead">
            double-round: A championship competition where teams play against each other twice, one at home and one away.
          </p> */}
          <p className="lead">
            single-round: A championship competition where teams play against each other one single time.
          </p>
          {/* <p className="lead">
            simple-cup: A cup competition that basically generates the first round (or the first two rounds) randomly.
          </p> */}
          <NTForm />
        </div>
      </div>
    </>
  );
}

export default withPageAuthRequired(Create, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
