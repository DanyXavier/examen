# CONSTRUCCION DEL CONTENEDOR

> **_NOTA:_**  Debes tener un contenedor o una instlacion de mysql asi como tener la base de datos construida a traves de scrip.sql

### ANTES DE CONSTRUIR LA IMAGEN EJECUTA
Para la construccion de la applicacion java

```shell script
./mvnw package
```
### DESPUES, CONSTRUYE LA IMAGEN CON
Construccion de la imagen docker

```shell script
docker build -f src/main/docker/Dockerfile.jvm -t spring/backend-jvm .
```
### CONSTRUCCION DEL CONTENEDOR

Debes definir las varialbes de entorno de la base de datos asi como el script.sql debe estar hecho

```shell script
docker run -i --rm -p 8080:8080 spring/backend-jvm
```
### definiendo las variables de base de datos

```shell script
docker run -i --rm -e MYSQL_HOST=192.168.3.104 -e MYSQL_USERNAME=examen -e MYSQL_PASSWORD=examen -p 8080:8080 spring/backend-jvm
```
> **_NOTA:_**  Tambien puedes definirlos dentro del Dockerfile.jvm ubicado en src/main/docker/Dockerfile.jvm
