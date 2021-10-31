import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MissionItem from './MissionItem';

const MissionList = () => {
  return (
    <Container>
      <Row>
        <MissionItem id={1} title="Mission 001" points={5} description="Join the Secret Agent Programme">
          <ol>
            <li>Fill out the New Agent Registration form</li>
            <li>Navigate to Mission Control to log your activity in the Activity Tracker</li>
            <li>(Note: this form will be used for tracking points for all missions and projects)</li>
            <li>Type your Agent ID (Twitter handle) in the field notes</li>
          </ol>
        </MissionItem>
      </Row>
    </Container>
  );
}

export default MissionList;