create table product (
    id uuid primary key default uuid_generate_v4(),
    title varchar(256)  not null,
    description text,
    tier varchar(30),
    image varchar(256),
    price int,
    score int
)

create table stock (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid unique not null references product(id) on delete cascade,
    count int not null default 0
)

--create extension if not exists "uuid-ossp";
