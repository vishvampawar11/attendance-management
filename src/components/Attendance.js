import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Modal from "react-modal";
import CheckIn from "./CheckIn";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Attendance = ({ attendance, checkIn, checkOut, deleteEntry }) => {
  const [checkInModalIsOpen, setCheckInModalIsOpen] = useState(false);
  const [checkOutModalIsOpen, setCheckOutModalIsOpen] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState();
  const [checkOutTime, setCheckOutTime] = useState();
  const [checkInTime, setCheckInTime] = useState();

  const openCheckInModal = () => setCheckInModalIsOpen(true);
  const closeCheckInModal = () => setCheckInModalIsOpen(false);
  const openCheckoutModal = () => setCheckOutModalIsOpen(true);
  const closeCheckOutModal = () => setCheckOutModalIsOpen(false);

  const checkInHandler = (rollNo, name, checkInTime) => {
    checkIn(rollNo, name, checkInTime);
    closeCheckInModal();
  };

  const checkOutHandler = (event) => {
    event.preventDefault();
    checkOut(selectedEntryId, checkOutTime, checkInTime);
    closeCheckOutModal();
  };

  return (
    <div>
      <Table responsive striped bordered hover width="">
        <thead>
          <tr className="table-dark">
            <th>Sr. No.</th>
            <th>Roll No.</th>
            <th>Name</th>
            <th>CheckIn time</th>
            <th>CheckOut time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((entry, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{entry.rollNo}</td>
                <td>{entry.name}</td>
                <td>{entry.checkinTime}</td>
                <td>
                  {entry.checkOutTime
                    ? entry.checkOutTime
                    : "Currently Present"}
                </td>
                <td>
                  <Button
                    className="me-2"
                    variant="danger"
                    onClick={() => {
                      deleteEntry(entry.id);
                    }}
                  >
                    delete
                  </Button>
                  {!entry.checkOutTime && (
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setSelectedEntryId(entry.id);
                        setCheckInTime(entry.checkinTime);
                        openCheckoutModal();
                      }}
                    >
                      checkout
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <p>No record present</p>
          )}
        </tbody>
      </Table>
      <Button
        variant="dark"
        onClick={() => {
          openCheckInModal();
        }}
      >
        Check in A Student
      </Button>

      <Modal
        isOpen={checkInModalIsOpen}
        onRequestClose={closeCheckInModal}
        style={customStyles}
        contentLabel="Check In a Student"
      >
        <CheckIn checkIn={checkInHandler} />
      </Modal>
      <Modal
        isOpen={checkOutModalIsOpen}
        onRequestClose={closeCheckOutModal}
        style={customStyles}
        contentLabel="Check Out Student"
      >
        <Form onSubmit={checkOutHandler}>
          <Form.Group>
            <Form.Label>Enter Check Out Time</Form.Label>
            <Form.Control
              type="time"
              required
              value={checkOutTime}
              onChange={(event) => setCheckOutTime(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">Check Out</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Attendance;
