import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CheckIn = ({ checkIn }) => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [checkInTime, setCheckInTime] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    checkIn(rollNo, name, checkInTime);
  };

  const nameChangeHandler = (event) => setName(event.target.value);
  const rollNoChangeHandler = (event) => setRollNo(event.target.value);
  const checkInTimeChangeHandler = (event) =>
    setCheckInTime(event.target.value);

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="rollNo">
          <Form.Label>Roll No</Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter Roll No"
            min={1}
            value={rollNo}
            onChange={rollNoChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Name"
            value={name}
            onChange={nameChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="checkInTime">
          <Form.Label>Check In Time</Form.Label>
          <Form.Control
            type="time"
            required
            placeholder="Enter Check In Time"
            value={checkInTime}
            onChange={checkInTimeChangeHandler}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CheckIn;
