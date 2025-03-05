import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BuildingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    yearBuilt: '',
    safetyLevel: 'Средний',
    lastInspection: ''
  });

  useEffect(() => {
    if (id) {
      const fetchBuilding = async () => {
        const response = await axios.get(`http://localhost:3001/buildings/${id}`);
        setFormData(response.data);
      };
      fetchBuilding();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:3001/buildings/${id}`, formData);
    } else {
      await axios.post('http://localhost:3001/buildings', formData);
    }
    navigate('/');
  };

  return (
    <div className="mt-4">
      <h2>{id ? 'Редактирование здания' : 'Добавление нового здания'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Название</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Год постройки</Form.Label>
          <Form.Control
            type="number"
            value={formData.yearBuilt}
            onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Уровень безопасности</Form.Label>
          <Form.Select
            value={formData.safetyLevel}
            onChange={(e) => setFormData({ ...formData, safetyLevel: e.target.value })}
          >
            <option value="Высокий">Высокий</option>
            <option value="Средний">Средний</option>
            <option value="Низкий">Низкий</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Дата последней проверки</Form.Label>
          <Form.Control
            type="date"
            value={formData.lastInspection}
            onChange={(e) => setFormData({ ...formData, lastInspection: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>
    </div>
  );
};

export default BuildingForm;