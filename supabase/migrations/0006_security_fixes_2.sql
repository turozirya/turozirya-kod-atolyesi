-- Faz 1 güvenlik düzeltmesi #2: Supabase, public şemadaki her fonksiyona
-- otomatik olarak anon + authenticated için AYRI (PUBLIC'ten bağımsız) execute
-- izni veriyor. 0005'teki "revoke ... from public" bu açık rol izinlerini
-- kaldırmadı (pg_proc.proacl ile doğrulandı). Burada doğrudan rollerden alıyoruz.
--
-- is_teacher/teaches_student/can_access_course RLS politikaları içinde
-- authenticated olarak çalıştığı için authenticated grant'i KORUNUYOR —
-- yalnızca anon'dan alınıyor (anon zaten hiçbir tabloya erişemiyor).
-- handle_new_user ve set_updated_at yalnızca tetikleyici olarak çalışır;
-- tetikleyiciler çağıran rolün execute iznine ihtiyaç duymaz, bu yüzden
-- her iki rolden de tamamen kaldırılabilir.

revoke execute on function is_teacher() from anon;
revoke execute on function teaches_student(uuid) from anon;
revoke execute on function can_access_course(uuid) from anon;

revoke execute on function handle_new_user() from anon, authenticated;
revoke execute on function set_updated_at() from public, anon, authenticated;
