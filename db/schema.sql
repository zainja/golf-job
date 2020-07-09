
create database golf;
use golf;

create table conversations
(
    id       int auto_increment
        primary key,
    sender   varchar(50)                         not null,
    receiver varchar(50)                         null,
    message  varchar(250)                        not null,
    time     timestamp default CURRENT_TIMESTAMP null
);

create table users
(
    email          varchar(50)          not null
        primary key,
    first_name     varchar(50)          not null,
    last_name      varchar(50)          not null,
    password       varchar(255)         not null,
    phone_number   varchar(12)          not null,
    email_verified tinyint(1) default 0 not null,
    isAdmin        tinyint(1) default 0 not null
);

create table notes
(
    id         int auto_increment
        primary key,
    trainer    varchar(50)                         not null,
    client     varchar(50)                         not null,
    title      varchar(50)                         not null,
    body       varchar(300)                        not null,
    video_path varchar(200)                        null,
    published  timestamp default CURRENT_TIMESTAMP null,
    constraint notes_users_email_fk
        foreign key (trainer) references users (email)
            on update cascade on delete cascade,
    constraint notes_users_email_fk_2
        foreign key (client) references users (email)
);