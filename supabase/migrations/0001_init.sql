-- Park & Revisit — initial database schema
-- Creates the "items" table (one row per parked item) and locks it down
-- so each person can only see and change their own rows (Row Level Security).

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  link text,
  note text,
  revisit_at timestamptz,
  reflection text,
  decision text check (decision in ('buy', 'let_go', 'still_deciding')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current on every change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists items_set_updated_at on public.items;
create trigger items_set_updated_at
before update on public.items
for each row execute function public.set_updated_at();

-- Fast listing of a user's items, newest first.
create index if not exists items_user_created_idx
  on public.items (user_id, created_at desc);

-- Row Level Security: every query is filtered to the signed-in user's own rows.
alter table public.items enable row level security;

drop policy if exists "Users can view their own items" on public.items;
create policy "Users can view their own items"
  on public.items for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own items" on public.items;
create policy "Users can insert their own items"
  on public.items for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own items" on public.items;
create policy "Users can update their own items"
  on public.items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own items" on public.items;
create policy "Users can delete their own items"
  on public.items for delete
  using (auth.uid() = user_id);
