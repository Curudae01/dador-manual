# Dador de objetos — Manual público

Manual público del **Dador de objetos para Second Life**.

Este repositorio contiene únicamente documentación para usuarios. **No contiene los scripts privados del producto.**

La revisión v2.2 amplía el manual con una guía completa para crear y preparar productos compatibles desde cero: política `T/C`, componentes `TEMP_`, `Script_Temporal v2.6.4`, `Config Temporal`, animaciones opcionales, permisos y diagnóstico previo antes de introducir el producto en el Dador.

También conserva la documentación de las cuatro animaciones opcionales del Dador: `ANIM_PORTAR`, `ANIM_SERVIR`, `ANIM_RECIBIR_ANEXADO` y `ANIM_RECOGER_NO_ANEXADO` pueden dejarse vacías para desactivarlas individualmente.

## Contrato técnico por idioma

La explicación del manual se muestra en el idioma elegido, pero los literales técnicos siguen la edición real del producto:

- **Español** (`index.html`): usa el contrato técnico español.
- **Inglés, portugués, alemán, francés y japonés**: usan el contrato técnico inglés.

Por tanto, fuera de la página española se muestran los nombres y valores reales de la edición inglesa, por ejemplo:

~~~text
Dador Config
Authorized Users
Temporary Config

Dador_Config_Products
Dador_Carrier_Animation
Dador_Multiuser_Menu
Temporary_Script

ACCESS=ALL
SIMULTANEOUS_MENUS=NO
AUTOMATIC_MESSAGE=YES

TEMP=NO;COPY=YES
TEMP=YES;COPY=NO
TEMP=YES;COPY=YES

PICKUP_MESSAGE=
DETACH_AT_END=NO
ANIMATION1=
DURATION1=
~~~

Los protocolos internos `DADOR-SPLIT-P3`, `DADOR-TEMP-P2`, `TEMP-OBJ-P1` y el prefijo `TEMP_` se conservan sin cambios.

## GitHub Pages

El sitio está preparado como web estática dentro de `docs/`.

Para publicarlo:

1. Abre **Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Rama: **main**.
4. Carpeta: **/docs**.
5. Guarda.

La URL prevista será:

`https://curudae01.github.io/dador-manual/`

## Archivos

- `docs/index.html` — manual completo.
- `docs/styles.css` — diseño responsive, claro/oscuro.
- `docs/app.js` — búsqueda, menú móvil y botones de copiar.
- `docs/.nojekyll` — publicación estática directa.

Manual actual: **v2.2**.
