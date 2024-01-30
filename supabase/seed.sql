CREATE TABLE public.profiles (
    id uuid not null references auth.users on delete cascade,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50)
);
CREATE INDEX idx_profile_user_id ON public.profiles(id);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable only by authenticated users"
    on profiles for select
    to authenticated
    using ( true );

create policy "Users can update own profile."
    on profiles for update
    using ( auth.uid() = id );

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,invited_at,confirmation_token,confirmation_sent_at,recovery_token,recovery_sent_at,email_change_token_new,email_change,email_change_sent_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,phone_change,phone_change_token,phone_change_sent_at,email_change_token_current,email_change_confirm_status,banned_until,reauthentication_token,reauthentication_sent_at,is_sso_user,deleted_at) VALUES ('737944e3-caf9-5e31-8ae9-5a1b360a293b', '0f5d546a-dd80-5406-a005-a4f3061b9fb4', '5e55b24a-6f54-5620-bb86-d04ea4c8f721', 'Viewer', 'Alec.Bahringer49059@project-wave.net', 'Quamquam solen philos non endus.', '2020-03-27T02:27:02.000Z', '2020-02-18T13:29:01.000Z', 'Est paulo vacuit ingenii pellanturbul qui approbantis.', '2020-01-05T12:49:14.000Z', 'Quam gratia quidnam quibus et.', '2020-05-21T16:31:44.000Z', 'Se cum quia negat profectu.', 'Locis non etiam meo laudatque solum singulosit, loqueret vitae ocurae sunt tu inum eae.', '2020-06-22T05:44:10.000Z', '2020-06-26T05:09:30.000Z', '{"Summum":"Res doloresse"}', '{"Nihilius":"Quae necestias"}', 't', '2020-04-04T04:00:44.000Z', '2020-05-09T04:42:49.000Z', DEFAULT, '2020-02-10T13:45:12.000Z', DEFAULT, DEFAULT, '2020-02-22T01:33:17.000Z', DEFAULT, DEFAULT, '2020-10-06T22:00:21.000Z', DEFAULT, '2020-04-12T15:52:43.000Z', DEFAULT, '2020-03-11T14:42:16.000Z');
