/* eslint-disable react/display-name */
import { React, Suspense } from 'react';

import Loading from './MatxLoading';

const Loadable = (Component) => function (props) {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
