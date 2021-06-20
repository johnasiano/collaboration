import React, { Fragment } from 'react';

import { PageTitle } from 'layout-components-user';

import Membership from './component';

export default function MembershipContent() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Membership"
        titleDescription="Please select membership"
      />
        <Membership />
    </Fragment>
  );
}
