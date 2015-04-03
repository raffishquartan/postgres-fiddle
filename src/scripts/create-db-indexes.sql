BEGIN;
CREATE INDEX entry_tag_entry_ndx ON pfsq.entry_tag (entry_id);
CREATE INDEX entry_tag_tag_ndx ON pfsq.entry_tag (tag_id);
COMMIT;
