import React from 'react';
import * as B from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const VersionsList = (props) => {
  const versionsLinks = props.versions.map(
    (v) => (
      <B.ListGroupItem>
        <Link to={`${v.permlink}`}>
          {v.permlink}
        </Link>
      </B.ListGroupItem>
    )
  );
  return (
    <B.Container>
      <B.ListGroup>
        {versionsLinks}
      </B.ListGroup>
    </B.Container>
  );
};

export default VersionsList;