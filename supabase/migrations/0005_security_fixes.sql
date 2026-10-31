-- Faz 1 güvenlik düzeltmesi (Security Advisor bulguları):
-- 1) set_updated_at search_path'i sabit değildi.
-- 2) Postgres, create function'da PUBLIC'e otomatik execute verir; bu yüzden
--    is_teacher/teaches_student/can_access_course/handle_new_user anon dahil
--    herkesten doğrudan /rest/v1/rpc/... ile çağrılabiliyordu. PUBLIC'ten geri
--    alıp yalnızca niyet edilen rollere veriyoruz.

alter function set_updated_at() set search_path = public;

revoke execute on function is_teacher() from public;
revoke execute on function teaches_student(uuid) from public;
revoke execute on function can_access_course(uuid) from public;
revoke execute on function check_class_code(text) from public;
revoke execute on function handle_new_user() from public;

grant execute on function is_teacher() to authenticated;
grant execute on function teaches_student(uuid) to authenticated;
grant execute on function can_access_course(uuid) to authenticated;
grant execute on function check_class_code(text) to anon, authenticated;
-- handle_new_user() hiçbir role'e grant edilmiyor; yalnızca auth.users
-- tetikleyicisi olarak çalışır, doğrudan RPC ile çağrılamaz.
