@echo off

set PGPASSWORD=1234

echo Creando base de datos db05...
"C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE db05;"

echo Creando tablas e insertando datos...
"C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -h localhost -p 5432 -d db05 -c "CREATE TABLE IF NOT EXISTS usuario (id BIGSERIAL PRIMARY KEY, usuario VARCHAR(255) NOT NULL UNIQUE, contrasena VARCHAR(255) NOT NULL);"

"C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -h localhost -p 5432 -d db05 -c "CREATE TABLE IF NOT EXISTS causa (id BIGSERIAL PRIMARY KEY, nombre_causa VARCHAR(255) NOT NULL);"

"C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -h localhost -p 5432 -d db05 -c "INSERT INTO usuario (usuario, contrasena) VALUES ('admin', '1234');"

"C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -h localhost -p 5432 -d db05 -c "INSERT INTO causa (nombre_causa) VALUES ('Hambre'), ('Sueño'), ('Ruidos o sonidos estridentes'), ('Miedo'), ('Cansancio'), ('Aburrimiento'), ('Presencia de objetos que dan miedo'), ('Sentirse enfermo'), ('Cambios en la rutina diaria'), ('Presencia de algo nuevo'), ('Conflicto con pares'), ('Conflicto con la familia'), ('Olvido de objetos en casa'), ('No traer materiales'), ('Traer solo una parte de los materiales'), ('Sentirse incomprendido'), ('Hipersensibilidad táctil (molestia de etiquetas, ropa, texturas)'), ('Sensibilidad a la textura de la comida'), ('Evaluaciones'), ('Otros (especificar)');"

echo Proceso finalizado.
pause