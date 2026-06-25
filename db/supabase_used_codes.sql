alter table public.rankings
add column if not exists used_codes text[] not null default '{}';

alter table public.rankings
add column if not exists coins integer not null default 0;

alter table public.rankings
add column if not exists initial_coins_granted boolean not null default false;

alter table public.rankings
add column if not exists code_exchange_count integer not null default 0;

do $$
begin
    if exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'rankings'
          and column_name = 'age'
    ) and not exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'rankings'
          and column_name = 'courage'
    ) then
        alter table public.rankings rename column age to courage;
    end if;

    if exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'rankings'
          and column_name = 'weight'
    ) and not exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'rankings'
          and column_name = 'battle_power'
    ) then
        alter table public.rankings rename column weight to battle_power;
    end if;
end $$;

alter table public.rankings
drop column if exists age;

alter table public.rankings
drop column if exists weight;

alter table public.rankings
add column if not exists courage integer not null default 1;

alter table public.rankings
add column if not exists battle_power integer not null default 10;

update public.rankings
set courage = coalesce(nullif(courage, 0), 1),
    battle_power = coalesce(nullif(battle_power, 0), 10);

update public.rankings
set initial_coins_granted = true
where coalesce(dino_name, '') <> ''
  and initial_coins_granted = false;

alter table public.rankings
alter column used_codes set default '{}',
alter column coins set default 0,
alter column initial_coins_granted set default false,
alter column code_exchange_count set default 0,
alter column courage set default 1,
alter column battle_power set default 10;

alter table public.rankings
alter column used_codes set not null,
alter column coins set not null,
alter column initial_coins_granted set not null,
alter column code_exchange_count set not null;

create unique index if not exists rankings_name_student_unique
on public.rankings (name, student_id);

create unique index if not exists rankings_code_unique
on public.rankings (code);

alter table public.rankings
drop constraint if exists rankings_score_nonnegative;

alter table public.rankings
drop column if exists score;

alter table public.rankings
drop constraint if exists rankings_courage_nonnegative,
add constraint rankings_courage_nonnegative check (courage >= 0);

alter table public.rankings
drop constraint if exists rankings_battle_power_nonnegative,
add constraint rankings_battle_power_nonnegative check (battle_power >= 0);

alter table public.rankings
drop constraint if exists rankings_coins_nonnegative,
add constraint rankings_coins_nonnegative check (coins >= 0);

alter table public.rankings
drop constraint if exists rankings_code_exchange_count_nonnegative,
add constraint rankings_code_exchange_count_nonnegative check (code_exchange_count >= 0);

comment on column public.rankings.used_codes is
'Codes this user has already redeemed. Used by the client to prevent duplicate code rewards.';

comment on column public.rankings.coins is
'Coins earned by the user. Stored in Supabase as the source of truth.';

comment on column public.rankings.initial_coins_granted is
'Whether the one-time survey completion coin reward has already been granted.';

comment on column public.rankings.code_exchange_count is
'Number of other-user codes this user has redeemed. Stored only in Supabase and not shown in the site UI.';

comment on column public.rankings.courage is
'Courage value shown in the growth screen and ranking.';

comment on column public.rankings.battle_power is
'Battle power value shown in the growth screen and ranking.';

create or replace function public.redeem_friend_code(
    p_name text,
    p_student_id text,
    p_friend_code text
)
returns public.rankings
language plpgsql
security definer
set search_path = public
as $$
declare
    current_user_row public.rankings%rowtype;
    friend_row public.rankings%rowtype;
    updated_user_row public.rankings%rowtype;
    next_exchange_count integer;
begin
    select *
    into current_user_row
    from public.rankings
    where name = p_name
      and student_id = p_student_id
    for update;

    if not found then
        raise exception 'CURRENT_PROFILE_NOT_FOUND';
    end if;

    if current_user_row.code = p_friend_code then
        raise exception 'CANNOT_REDEEM_OWN_CODE';
    end if;

    if p_friend_code = any(current_user_row.used_codes) then
        raise exception 'CODE_ALREADY_REDEEMED';
    end if;

    select *
    into friend_row
    from public.rankings
    where code = p_friend_code
    limit 1;

    if not found then
        raise exception 'FRIEND_CODE_NOT_FOUND';
    end if;

    if friend_row.name = current_user_row.name
       and friend_row.student_id = current_user_row.student_id then
        raise exception 'CANNOT_REDEEM_OWN_CODE';
    end if;

    next_exchange_count := coalesce(current_user_row.code_exchange_count, array_length(current_user_row.used_codes, 1), 0) + 1;

    update public.rankings
    set used_codes = array_append(current_user_row.used_codes, p_friend_code),
        code_exchange_count = next_exchange_count,
        coins = coalesce(coins, 0) + case when next_exchange_count % 5 = 0 then 1 else 0 end,
        courage = coalesce(courage, 1) + 1,
        battle_power = coalesce(battle_power, 10) + 10
    where name = p_name
      and student_id = p_student_id
    returning *
    into updated_user_row;

    return updated_user_row;
end;
$$;

grant execute on function public.redeem_friend_code(text, text, text) to anon, authenticated;
