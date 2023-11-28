CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    username VARCHAR,
    password VARCHAR
);

CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    fullnamefile VARCHAR,
);

CREATE TABLE credentials (
    id SERIAL PRIMARY KEY,
    fullnamefile VARCHAR,
);

CREATE TABLE fields(
    id SERIAL PRIMARY KEY,
    bankAccount: VARCHAR,
    bankMFO: VARCHAR,
    bankName: VARCHAR,
    contractCode: VARCHAR,
    contractCostInLetters: VARCHAR,
    duration: VARCHAR,
    examFirst: VARCHAR,
    fieldCode: VARCHAR,
    fieldName: VARCHAR,
    fieldType: VARCHAR,
    firstExamSubject: VARCHAR,
    isVisible: VARCHAR,
    secondExamSubject: VARCHAR,
    studyLang: VARCHAR,
    studyType: VARCHAR,
    contractCost: VARCHAR,
);


 CREATE TABLE botUsers (
    id SERIAL PRIMARY KEY,
    chat_id VARCHAR(255),
    first_name VARCHAR(255),
    username VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- users HAS MANY posts
-- posts BELONGS TO ONE user
