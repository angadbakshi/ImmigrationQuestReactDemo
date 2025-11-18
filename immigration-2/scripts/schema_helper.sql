create or replace function get_tables_info()
returns table (
  table_name text,
  columns jsonb
)
language plpgsql
security definer
as $$
begin
  return query
  select
    t.table_name,
    jsonb_agg(
      jsonb_build_object(
        'column_name', c.column_name,
        'data_type', c.data_type,
        'is_nullable', c.is_nullable,
        'column_default', c.column_default
      )
      order by c.ordinal_position
    ) as columns
  from information_schema.tables t
  join information_schema.columns c
    on c.table_name = t.table_name
    and c.table_schema = t.table_schema
  where t.table_schema = 'public'
    and t.table_type = 'BASE TABLE'
  group by t.table_name
  order by t.table_name;
end;
$$;