import { Table } from "react-bootstrap";

const CurrentAttendance = ({ attendance }) => {
  const currentAttendance = attendance.filter((entry) => {
    if (entry.checkOutTime) return false;
    return true;
  });

  return (
    <div>
      <h1>Currently {currentAttendance.length} student(s) are present in the school</h1>
      <Table striped bordered hover width="">
        <thead>
          <tr className="table-dark">
            <th>Sr. No.</th>
            <th>Roll No.</th>
            <th>Name</th>
            <th>CheckIn time</th>
          </tr>
        </thead>
        <tbody>
          {currentAttendance.length > 0 ? (
            currentAttendance.map((entry, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{entry.rollNo}</td>
                <td>{entry.name}</td>
                <td>{entry.checkinTime}</td>
              </tr>
            ))
          ) : (
            <p>No record present</p>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CurrentAttendance;
