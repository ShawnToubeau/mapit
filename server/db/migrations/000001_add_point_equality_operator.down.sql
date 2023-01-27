DROP OPERATOR CLASS IF EXISTS public.point_hash_ops USING hash;

DROP OPERATOR FAMILY public.point_hash_ops using hash;

DROP FUNCTION IF EXISTS public.hashpoint(point);
