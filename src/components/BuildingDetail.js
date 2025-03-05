import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const BuildingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    const fetchBuilding = async () => {
      const response = await axios.get(`http://localhost:3001/buildings/${id}`);
      setBuilding(response.data);
    };
    fetchBuilding();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/buildings/${id}`);
    navigate('/');
  };

  if (!building) return <div>Загрузка...</div>;

  return (
    <div className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{building.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Адрес: {building.address}</ListGroup.Item>
            <ListGroup.Item>Год постройки: {building.yearBuilt}</ListGroup.Item>
            <ListGroup.Item>Уровень безопасности: {building.safetyLevel}</ListGroup.Item>
            <ListGroup.Item>Последняя проверка: {building.lastInspection}</ListGroup.Item>
          </ListGroup>
          <div className="mt-3">
            <Link to={`/edit/${building.id}`} className="btn btn-warning me-2">
              Редактировать
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Удалить
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BuildingDetail;