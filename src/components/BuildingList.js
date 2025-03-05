import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await axios.get('http://localhost:3001/buildings');
      setBuildings(response.data);
    };
    fetchBuildings();
  }, []);

  return (
    <div className="mt-4">
      <h2>Список зданий</h2>
      <Link to="/add" className="btn btn-primary mb-3">
        Добавить новое здание
      </Link>
      <div className="row">
        {buildings.map((building) => (
          <div className="col-md-4 mb-3" key={building.id}>
            <Card>
              <Card.Body>
                <Card.Title>{building.name}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Адрес: {building.address}</ListGroup.Item>
                  <ListGroup.Item>Уровень безопасности: {building.safetyLevel}</ListGroup.Item>
                </ListGroup>
                <Link to={`/building/${building.id}`} className="btn btn-info mt-2">
                  Подробнее
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingList;