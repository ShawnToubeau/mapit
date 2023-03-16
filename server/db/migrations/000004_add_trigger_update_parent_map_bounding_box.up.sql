create OR REPLACE trigger update_parent_map_bounding_box
    after insert or update or delete
    on events
    for each row
execute procedure update_map_bounding_box();

