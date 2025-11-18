-- Function to get schema information
CREATE OR REPLACE FUNCTION get_schema_info()
RETURNS TABLE (
  table_name text,
  columns jsonb
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.table_name,
    jsonb_agg(
      jsonb_build_object(
        'column_name', c.column_name,
        'data_type', c.data_type,
        'is_nullable', c.is_nullable,
        'column_default', c.column_default
      )
    ) as columns
  FROM information_schema.tables t
  JOIN information_schema.columns c
    ON c.table_name = t.table_name
    AND c.table_schema = t.table_schema
  WHERE t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
  GROUP BY t.table_name;
END;
$$;