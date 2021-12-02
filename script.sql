create table libros_criticas(
   id INT NOT NULL AUTO_INCREMENT,
   libro_nombre VARCHAR(100) NOT NULL,
   critica VARCHAR(40) NOT NULL,
   PRIMARY KEY (id)
);
CREATE USER ',YSQL_USER'@'libros_criticas' IDENTIFIED VIA mysql_native_password USING '***';GRANT SELECT, CREATE, DROP, ALTER ON *.* TO ',YSQL_USER'@'libros_criticas' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `libros`.* TO ',YSQL_USER'@'libros_criticas';
INSERT INTO `libros_criticas`(`id`, `libro_nombre`, `critica`) VALUES ('1','cien años de soledad','excelente libro')