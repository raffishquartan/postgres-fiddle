BEGIN;
CREATE TABLE pf.entry (
  id              uuid primary key default pf.uuid_generate_v4(),
  date            date not null,
  date_created    timestamp without time zone default now() not null,
  date_modified   timestamp without time zone default now() not null,
  body            text not null
);
CREATE TABLE pf.tag (
  id              uuid primary key default pf.uuid_generate_v4(),
  value           varchar(256) unique not null
);
CREATE TABLE pf.entry_tag (
  entry_id        uuid references pf.entry (id),
  tag_id          uuid references pf.tag (id),
  primary key(entry_id, tag_id)
);
CREATE INDEX entry_tag_entry_ndx ON pf.entry_tag (entry_id);
CREATE INDEX entry_tag_tag_ndx ON pf.entry_tag (tag_id);
COMMIT;
