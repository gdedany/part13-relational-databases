
create table blogs(
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('test author 1', 'test url 1', 'test title 1', 51);
insert into blogs (author, url, title, likes) values ('test author 2', 'test url 2', 'test title 2', 52);