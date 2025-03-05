import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import BuildingList from './components/BuildingList';
import BuildingDetail from './components/BuildingDetail';
import BuildingForm from './components/BuildingForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Безопасность зданий</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/add">Добавить здание</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<BuildingList />} />
          <Route path="/building/:id" element={<BuildingDetail />} />
          <Route path="/add" element={<BuildingForm />} />
          <Route path="/edit/:id" element={<BuildingForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;