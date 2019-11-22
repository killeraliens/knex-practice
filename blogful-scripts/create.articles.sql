drop table if exists blogful_articles;
create table if not exists blogful_articles (
  id int primary key generated by default as identity,
  title text not null,
  date_published timestamp default now() not null,
  content text
);

