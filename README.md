# Test Fullstack - Microservicios con NestJS

Este proyecto implementa una arquitectura de **microservicios** utilizando **NestJS** y **TypeScript**, como parte de una prueba técnica de desarrollo fullstack.  

Incluye dos microservicios principales:  

- **products-service** → Gestión de productos.  
- **inventory-service** → Gestión de inventario.  

Ambos servicios se comunican con **MySQL** dentro de un entorno **Docker** y exponen sus APIs bajo el estándar **JSON:API**.

---

## 📦 Requisitos del Sistema

Antes de iniciar, asegúrate de contar con los siguientes componentes instalados en tu entorno:  
- **Docker** y **Docker Compose**  

---

## 🚀 Instalación y Configuración

Sigue estos pasos para clonar y levantar los servicios:

### 1. Clonar el repositorio

- git clone https://github.com/juandabar/fullstack-test.git
- cd fullstack-test

### 2. 🐳 Levantar servicios con Docker (Mysql, Microservicios)
- ***products-service/***\# npm install
- ***products-service/***\# npm run build
- ---
- ***inventory-service/***\# npm install
- ***inventory-service/***\# npm run build
- ---
- ***fullstack-test/*** \# docker-compose up -d
### 3. 📖 Documentación Swagger

Cada microservicio expone su propia documentación Swagger:

- Products: [http://localhost:3001/docs](http://localhost:3001/docs) - `(Authorize)`: secret-products-123
- Inventory: [http://localhost:3002/docs](http://localhost:3002/docs) - `(Authorize)`: secret-inventory-456
## 4. Tests
Ejecuta este comando desde el directorio raíz de cada servicio **(products-service)** o **(inventory-service)**:

**Unitarios:**
- `cd` **products-service** || `cd` **inventory-service**
- npm run test
---
**Integración:**
- `cd` **inventory-service**
- npm run test:e2e
### 🏗️ Descripción breve de la arquitectura
***Products Service***:
 Responsable de la gestión de productos (crear, listar, consultar).
Expone una API REST versionada con /api/v1/products.

***Inventory Service***:
Responsable de la gestión del inventario. Consulta el servicio de productos para enriquecer los datos.
Expone /inventory.

***Base de datos***:
Ambos servicios usan MySQL para persistencia.
Se orquesta con Docker.

***Comunicación entre microservicios***:
El inventory-service consume al products-service vía HTTP, autenticándose con API Keys.

***Estandarización de respuestas***
Ambos microservicios usan un interceptor global para devolver datos en formato JSON:API.

### ⚙️ Decisiones técnicas y justificaciones
- NestJS + TypeScript: Framework modular, con DI, interceptores, middlewares y soporte de testing → facilita buenas prácticas en APIs REST.
- ***MySQL en lugar de MongoDB:*** 
 -Los datos de productos e inventario tienen relaciones claras y transacciones simples.
 -La consistencia relacional es más útil que la flexibilidad de documentos.
- ***Docker + docker-compose:*** Entorno reproducible y fácil de levantar para evaluadores.
- ***Swagger:*** Auto-documentación para consumidores de la API.
- ***API Keys entre servicios***: Simple, suficiente para la prueba, evita exponer endpoints sin control.
- ***JSON:API***: Estandariza la comunicación, estructura clara para recursos
- 

El cliente puede consumir directamente ambos microservicios.

El inventory-service consulta al products-service para enriquecer información.

Ambos persisten datos en MySQL.

Autenticación entre servicios mediante API Key.
