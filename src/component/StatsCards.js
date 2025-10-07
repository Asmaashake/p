import React from "react";
import { Card, Col, Row } from "antd";

export default function StatsCards({ cards }) {
return (
    <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
    {cards.map((card, i) => (
        <Col xs={24} sm={12} md={6} key={i}>
        <Card hoverable className="custom-card">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {card.icon}
            <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
            </div>
            </div>
        </Card>
        </Col>
    ))}
    </Row>
);
}
