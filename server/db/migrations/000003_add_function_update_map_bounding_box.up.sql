create or replace function update_map_bounding_box() returns trigger
    language plpgsql
as
$$
BEGIN
    IF
        (TG_OP = 'DELETE') THEN
        WITH cte_events_envelop AS (select box(st_envelope(st_collect(geometry(events.point))))
                                    from events
                                    where events.event_map_events = OLD.event_map_events)
        UPDATE event_maps
        SET bounding_box = cte_events_envelop.box
        FROM cte_events_envelop
        WHERE id = OLD.event_map_events;
    ELSIF
        (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN
        WITH cte_events_envelop AS (select box(st_envelope(st_collect(geometry(events.point))))
                                    from events
                                    where events.event_map_events = NEW.event_map_events)
        UPDATE event_maps
        SET bounding_box = cte_events_envelop.box
        FROM cte_events_envelop
        WHERE id = NEW.event_map_events;
    END IF;
    RETURN NULL;
END;
$$;

alter function update_map_bounding_box() owner to postgres;

grant
    execute
    on
    function
    update_map_bounding_box
    () to anon;

grant execute on function update_map_bounding_box
    () to authenticated;

grant execute on function update_map_bounding_box
    () to service_role;

