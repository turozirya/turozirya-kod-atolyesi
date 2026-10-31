-- Faz 1: yeni kullanıcı tetikleyicisi ve sınıf kodu doğrulama RPC'si.

create function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text;
  v_display_name text;
  v_avatar text;
  v_class_code text;
  v_class_id uuid;
begin
  v_class_code := new.raw_user_meta_data ->> 'class_code';
  v_username := new.raw_user_meta_data ->> 'username';
  v_display_name := new.raw_user_meta_data ->> 'display_name';
  v_avatar := new.raw_user_meta_data ->> 'avatar';

  if v_class_code is not null and v_class_code <> '' then
    select id into v_class_id from classes where join_code = upper(v_class_code);
    if v_class_id is null then
      raise exception 'INVALID_CLASS_CODE';
    end if;
  end if;

  if v_username is null or v_username = '' then
    v_username := 'user_' || replace(new.id::text, '-', '');
  end if;
  if v_display_name is null or v_display_name = '' then
    v_display_name := split_part(new.email, '@', 1);
  end if;
  if v_avatar is null or v_avatar = '' then
    v_avatar := 'robot-1';
  end if;

  insert into profiles (id, username, display_name, avatar, role, class_id)
  values (new.id, v_username, v_display_name, v_avatar, 'student', v_class_id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

create function check_class_code(p_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
begin
  select name into v_name from classes where join_code = upper(p_code);
  return v_name;
end;
$$;

grant execute on function check_class_code(text) to anon, authenticated;
