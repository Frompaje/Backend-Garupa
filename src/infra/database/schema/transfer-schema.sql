CREATE TABLE Transfers (
    id UUID PRIMARY KEY,
    external_id VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    expected_on TIMESTAMP ,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) 
);
