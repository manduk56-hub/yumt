create table if not exists public.rankings (
    id bigserial primary key,
    code text not null,
    name text not null,
    student_id text not null,
    dino_name text,
    dino_emoji text,
    dino_desc text,
    used_codes text[] not null default '{}',
    coins integer not null default 0,
    initial_coins_granted boolean not null default false,
    code_exchange_count integer not null default 0,
    courage integer not null default 1,
    battle_power integer not null default 10,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

do $$
begin
    if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'rankings' and column_name = 'age')
       and not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'rankings' and column_name = 'courage') then
        alter table public.rankings rename column age to courage;
    end if;

    if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'rankings' and column_name = 'weight')
       and not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'rankings' and column_name = 'battle_power') then
        alter table public.rankings rename column weight to battle_power;
    end if;
end $$;

alter table public.rankings add column if not exists used_codes text[] not null default '{}';
alter table public.rankings add column if not exists coins integer not null default 0;
alter table public.rankings add column if not exists initial_coins_granted boolean not null default false;
alter table public.rankings add column if not exists code_exchange_count integer not null default 0;
alter table public.rankings add column if not exists courage integer not null default 1;
alter table public.rankings add column if not exists battle_power integer not null default 10;
alter table public.rankings add column if not exists updated_at timestamptz not null default now();

alter table public.rankings drop column if exists age;
alter table public.rankings drop column if exists weight;
alter table public.rankings drop column if exists score;

update public.rankings
set courage = coalesce(nullif(courage, 0), 1),
    battle_power = coalesce(nullif(battle_power, 0), 10),
    used_codes = coalesce(used_codes, '{}'),
    coins = coalesce(coins, 0),
    initial_coins_granted = coalesce(initial_coins_granted, false),
    code_exchange_count = coalesce(code_exchange_count, 0);

create unique index if not exists rankings_name_student_unique on public.rankings (name, student_id);
create unique index if not exists rankings_code_unique on public.rankings (code);

alter table public.rankings drop constraint if exists rankings_courage_nonnegative;
alter table public.rankings add constraint rankings_courage_nonnegative check (courage >= 0);
alter table public.rankings drop constraint if exists rankings_battle_power_nonnegative;
alter table public.rankings add constraint rankings_battle_power_nonnegative check (battle_power >= 0);
alter table public.rankings drop constraint if exists rankings_coins_nonnegative;
alter table public.rankings add constraint rankings_coins_nonnegative check (coins >= 0);
alter table public.rankings drop constraint if exists rankings_code_exchange_count_nonnegative;
alter table public.rankings add constraint rankings_code_exchange_count_nonnegative check (code_exchange_count >= 0);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists rankings_set_updated_at on public.rankings;
create trigger rankings_set_updated_at before update on public.rankings
for each row execute function public.set_updated_at();

create or replace function public.redeem_friend_code(p_name text, p_student_id text, p_friend_code text)
returns public.rankings
language plpgsql
as $$
declare
    current_user_row public.rankings%rowtype;
    friend_row public.rankings%rowtype;
    updated_user_row public.rankings%rowtype;
    next_exchange_count integer;
begin
    select * into current_user_row
    from public.rankings
    where name = p_name and student_id = p_student_id
    for update;

    if not found then raise exception 'CURRENT_PROFILE_NOT_FOUND'; end if;
    if current_user_row.code = p_friend_code then raise exception 'CANNOT_REDEEM_OWN_CODE'; end if;
    if p_friend_code = any(current_user_row.used_codes) then raise exception 'CODE_ALREADY_REDEEMED'; end if;

    select * into friend_row
    from public.rankings
    where code = p_friend_code
    limit 1;

    if not found then raise exception 'FRIEND_CODE_NOT_FOUND'; end if;
    if friend_row.name = current_user_row.name and friend_row.student_id = current_user_row.student_id then
        raise exception 'CANNOT_REDEEM_OWN_CODE';
    end if;

    next_exchange_count := coalesce(current_user_row.code_exchange_count, array_length(current_user_row.used_codes, 1), 0) + 1;

    update public.rankings
    set used_codes = array_append(current_user_row.used_codes, p_friend_code),
        code_exchange_count = next_exchange_count,
        coins = coalesce(coins, 0) + case when next_exchange_count % 5 = 0 then 1 else 0 end,
        courage = coalesce(courage, 1) + 1,
        battle_power = coalesce(battle_power, 10) + 10
    where name = p_name and student_id = p_student_id
    returning * into updated_user_row;

    return updated_user_row;
end;
$$;
