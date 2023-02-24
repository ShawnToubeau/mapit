CREATE
    OR REPLACE FUNCTION public.hashbox(box) RETURNS integer
    LANGUAGE sql
    IMMUTABLE
AS
'SELECT public.hashpoint($1[0]) # public.hashpoint($1[1])';

-- we must drop the operator class because it doesn't support 'CREATE OR REPLACE'
DROP OPERATOR CLASS IF EXISTS public.box_hash_ops USING hash;

CREATE
    OPERATOR CLASS public.box_hash_ops DEFAULT FOR TYPE box USING hash AS
    OPERATOR 1 ~=(box,box),
    FUNCTION 1 public.hashbox(box);
