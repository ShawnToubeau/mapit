DROP OPERATOR CLASS IF EXISTS public.box_hash_ops USING hash;

DROP OPERATOR FAMILY public.box_hash_ops using hash;

DROP FUNCTION IF EXISTS public.hashbox(box);
