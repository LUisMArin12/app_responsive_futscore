# 🏆 Aplicación Responsiva para el Mundial Escolar de Fútbol  
**Comité Organizador del Mundial Escolar de Fútbol**

---

## 🧭 Descripción General

Este repositorio contiene el diseño, desarrollo e implementación de una **aplicación responsiva y multiplataforma** orientada a mejorar la experiencia de los asistentes, participantes y organizadores del **Mundial Escolar de Fútbol**. La solución propuesta se adapta automáticamente a distintos dispositivos inteligentes (smartphones, tablets, pantallas públicas y wearables), con un único código base, facilitando el acceso universal a la información clave del torneo.

---

## 🎯 Objetivos

### Objetivo General
Desarrollar una solución digital integral que permita a los usuarios:
- Consultar el calendario completo de partidos.
- Ver resultados en tiempo real.
- Reservar lugares para encuentros seleccionados.
- Recibir notificaciones personalizadas.
- Acceder a información general desde cualquier dispositivo y en cualquier momento.

### Objetivos Específicos
- Unificar el código base para asegurar mantenibilidad y eficiencia.
- Cumplir con estándares de accesibilidad y rendimiento.
- Diseñar una experiencia de usuario adaptada al contexto de uso y dispositivo.
- Asegurar escalabilidad para futuras ediciones del torneo.

---

## 🧩 Módulos Funcionales

1. **🗓️ Módulo de Horarios de Partidos**
   - Listado de encuentros con fecha, hora, ubicación, equipos, fase y canal de transmisión.
   - Filtro por fechas, equipos y sede.
   - Ajuste automático a zona horaria del dispositivo.

2. **🎟️ Módulo de Reservación de Lugares**
   - Registro e inicio de sesión mediante correo, teléfono o redes sociales.
   - Visualización de disponibilidad por partido.
   - Generación de ticket digital con código QR.
   - Validación de entrada y confirmación de reserva.

3. **📊 Módulo de Resultados en Tiempo Real**
   - Datos en vivo con actualización por WebSocket o polling inteligente.
   - Indicadores de estado: en curso, finalizado o pendiente.
   - Visualización de jugadas destacadas (en versiones con mayor resolución).

4. **ℹ️ Módulo de Información General**
   - Noticias breves.
   - Tabla de posiciones por grupo.
   - Estadísticas por equipo y jugador.
   - Sección “Sabías que…” con datos curiosos.

5. **🔔 Sistema de Notificaciones Personalizadas**
   - Notificaciones push por equipo favorito, reservas, cambios de horario o resultados.
   - Configuración por el usuario de temas de interés.

---

## 🏗️ Arquitectura del Sistema

- **Frontend:** React Native (multiplataforma).
- **Backend:** Node.js (Express).
- **Hosting:** Render.
- **Control de versiones:** Git + GitHub.

---

## 📲 Dispositivos y Consideraciones de Diseño

| Dispositivo         | Resolución Estimada        | Diseño Adaptativo                     | Contexto de Uso                         |
|---------------------|----------------------------|----------------------------------------|------------------------------------------|
| **Smartphones**     | 360x640 – 1080x2400 px     | Layout de columna única, bottom-nav   | Consulta rápida, movilidad total         |
| **Tablets**         | 600x960 – 1600x2560 px     | Dos columnas, diseño modular          | Consultas en profundidad, semifijo       |
| **Pantallas (TVs)** | Full HD (1920x1080) o 4K   | Íconos grandes, carruseles automáticos| Visualización continua, solo lectura     |
| **Wearables**       | 240x240 – 454x454 px       | Scroll vertical, tarjetas resumidas   | Uso en movimiento, resultados rápidos    |

---

## 🔄 Flujos Principales de Usuario

### Reserva de Lugar
1. El usuario inicia sesión.
2. Selecciona partido.
3. Revisa disponibilidad.
4. Realiza reserva.
5. Recibe confirmación y código QR.

### Consulta de Resultados
1. Accede al módulo de resultados.
2. Filtra por fecha o equipos.
3. Visualiza marcador en tiempo real.

### Configuración de Notificaciones
1. Accede al perfil.
2. Selecciona equipos favoritos.
3. Activa notificaciones de partidos o cambios.

---

## ✅ Criterios de Aceptación

- [ ] La aplicación se adapta a cada tipo de dispositivo correctamente.
- [ ] Los usuarios pueden consultar partidos sin iniciar sesión.
- [ ] El sistema de reservas exige autenticación y muestra confirmación.
- [ ] El módulo de resultados actualiza datos sin necesidad de recarga.
- [ ] El sistema de notificaciones es configurable por el usuario.

---

## 🧠 Roles Involucrados

| Rol                | Funciones Clave                                                  |
|--------------------|------------------------------------------------------------------|
| **Product Owner**  | Define requerimientos y aprueba entregables                      |
| **Diseñador UI/UX**| Mockups responsivos, experiencia adaptativa según dispositivo    |
| **Desarrollador**  | Implementación del frontend y lógica de negocio                  |

---

## 🔗 Enlaces Relevantes

- 🎨 **Mockups en Figma:**  
  _[Enlace por definir]_

- 💻 **Evidencia Técnica:**  
  _[Enlace por definir]_

---

## 📬 Contacto

- **Correo del Comité:** contacto@mundialescolar.org  
- **Sitio oficial:** https://mundialescolar.org

---

