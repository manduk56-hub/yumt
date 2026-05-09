alter table public.rankings
add column if not exists used_codes text[] not null default '{}';

alter table public.rankings
add column if not exists coins integer not null default 0;

alter table public.rankings
alter column used_codes set default '{}',
alter column coins set default 0,
alter column score set default 0,
alter column age set default 0,
alter column weight set default 0;

alter table public.rankings
alter column used_codes set not null,
alter column coins set not null;

create unique index if not exists rankings_name_student_unique
on public.rankings (name, student_id);

create unique index if not exists rankings_code_unique
on public.rankings (code);

alter table public.rankings
drop constraint if exists rankings_score_nonnegative,
add constraint rankings_score_nonnegative check (score >= 0);

alter table public.rankings
drop constraint if exists rankings_age_nonnegative,
add constraint rankings_age_nonnegative check (age >= 0);

alter table public.rankings
drop constraint if exists rankings_weight_nonnegative,
add constraint rankings_weight_nonnegative check (weight >= 0);

alter table public.rankings
drop constraint if exists rankings_coins_nonnegative,
add constraint rankings_coins_nonnegative check (coins >= 0);

comment on column public.rankings.used_codes is
'Codes this user has already redeemed. Used by the client to prevent duplicate code rewards.';

comment on column public.rankings.coins is
'Coins earned by the user. Stored in Supabase as the source of truth.';

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

    update public.rankings
    set used_codes = array_append(current_user_row.used_codes, p_friend_code),
        age = coalesce(age, 0) + 1,
        weight = coalesce(weight, 0) + 50,
        score = coalesce(score, 0) + 100
    where name = p_name
      and student_id = p_student_id
    returning *
    into updated_user_row;

    return updated_user_row;
end;
$$;

grant execute on function public.redeem_friend_code(text, text, text) to anon, authenticated;
