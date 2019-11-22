delete from blogful_articles;

insert into blogful_articles (title, date_published, content)
values
  ('Some Title', now() - '2 years'::interval, 'Tons of content for this article I made up.'),
  ('The Other Title', now() - '3 days'::interval, 'Ughghhhhhhh content lorem ipsum.'),
  ('THAT Title', now() - '20 days'::interval, 'Its raining outside.'),
  ('Bronzi', now() - '15 days'::interval, 'Lorem ipsum.'),
  ('All about ice cream', now() - '1 year'::interval, 'Fucking great'),
  ('Outer Space', now() - '3 days'::interval, 'This article is all about outer space'),
  ('AGHHH real monsters', now() - '18 days'::interval, 'Ughghhhhhhh real monsters. queries, the queries were getting more and more complicated. This would make them less reusable and the codebase would become messier. The functions were a good way to introduce re-use, but is there a better way to organize these functions?'),
  ('Oouuuuch', now() - '3 days'::interval, 'When you want to send a parcel, you go to the post office. At the post office, you can send parcels of different sizes to different locations -- you can also collect parcels that were for you if you know the correct information. The post office is a service that "encapsulates" methods for interacting with parcels. It would be frustrating if you had to go to a different post office to send parcels to different locations, we want a single post office that can send parcels anywhere. Also, we don''t want to know the full process for sending a parcel or receiving one, the post service manages all of these steps for us behind the scenes.'),
  ('Bronzi', now() - '15 days'::interval, 'Lorem ipsum.');


