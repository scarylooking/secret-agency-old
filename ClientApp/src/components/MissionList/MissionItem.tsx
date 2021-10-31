import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

interface MissionItemProps {
  id: Number,
  title: String,
  points: Number,
  children: React.ReactNode,
  description: String
}

const MissionItem = (props: MissionItemProps) => {
  return (
    <Container>
      <Row>
        <h1>{props.title}</h1>
        <p>Worth {props.points} points</p>
        <p>{props.description}</p>
        {props.children}
      </Row>
      <Row>
        <Button variant="outline-primary">Report</Button>
      </Row>
    </Container>
  );
}

export default MissionItem;