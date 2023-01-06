import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Attendance Management</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;
