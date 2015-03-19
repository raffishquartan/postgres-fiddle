BEGIN;
INSERT INTO pf.tag (value) VALUES
  ('cooking'),
  ('self-control'),
  ('relationship'),
  ('planning'),
  ('palantir'),
  ('assertiveness'),
  ('exercise'),
  ('impact');
INSERT INTO pf.entry (date, body) VALUES
  ('20150201', 'Cooked but roast and roast veges for dinner, first time ever - Katie was impressed, said it was delicious'),
  ('20150202', 'Got to bed late after talking about pregnancy with EK, packing emergency food, so turned out light immediately and snuggled. Self control FTW!'),
  ('20150203', 'Planned goals for Shire, both Dan and AnneR agreed with my suggestions and prioritisation'),
  ('20150204', 'Tube carriage was crammed, there was a man standing in the centre aisle with a large gap in front of him. I called out loudly and clearly asking him to move down. He did, a pretty girl smiled at me.'),
  ('20150205', '7.2 mile hike in rain and snow at Tahoe. 1300 vertical feet'),
  ('20150207', 'XXXXX was being quite negative and whiny about rdell politics (possibly justified). I remained chilled/didn''t join in, also positive and non-judgmental throughout.'),
  ('20150208', 'Driving back XXXXX was giving lots of unsolicited advice and suggestions because he was nervous about me (someone else?) driving. I asserted myself calmly but effectively'),
  ('20150209', 'Palantir enterprise contract approved by IAEA - $10mm over 10 years');
INSERT INTO pf.entry_tag (entry_id, tag_id) VALUES
  ((SELECT id FROM pf.entry WHERE date = '20150201'), (SELECT id FROM pf.tag WHERE value = 'cooking')),
  ((SELECT id FROM pf.entry WHERE date = '20150201'), (SELECT id FROM pf.tag WHERE value = 'relationship')),
  ((SELECT id FROM pf.entry WHERE date = '20150202'), (SELECT id FROM pf.tag WHERE value = 'self-control')),
  ((SELECT id FROM pf.entry WHERE date = '20150203'), (SELECT id FROM pf.tag WHERE value = 'planning')),
  ((SELECT id FROM pf.entry WHERE date = '20150203'), (SELECT id FROM pf.tag WHERE value = 'palantir')),
  ((SELECT id FROM pf.entry WHERE date = '20150204'), (SELECT id FROM pf.tag WHERE value = 'assertiveness')),
  ((SELECT id FROM pf.entry WHERE date = '20150205'), (SELECT id FROM pf.tag WHERE value = 'exercise')),
  ((SELECT id FROM pf.entry WHERE date = '20150207'), (SELECT id FROM pf.tag WHERE value = 'self-control')),
  ((SELECT id FROM pf.entry WHERE date = '20150208'), (SELECT id FROM pf.tag WHERE value = 'self-control')),
  ((SELECT id FROM pf.entry WHERE date = '20150208'), (SELECT id FROM pf.tag WHERE value = 'assertiveness')),
  ((SELECT id FROM pf.entry WHERE date = '20150209'), (SELECT id FROM pf.tag WHERE value = 'palantir')),
  ((SELECT id FROM pf.entry WHERE date = '20150209'), (SELECT id FROM pf.tag WHERE value = 'impact'));
COMMIT;
VACUUM ANALYZE;
