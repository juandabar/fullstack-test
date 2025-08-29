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
- docker-compose up --build --force-recreate
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