# Consola docente IUB

Un solo login y selector de módulo para participación, asistencia y notas.

## Publicación

1. Crear repo `iub-docente` en GitHub (usuario `dfdomin`).
2. Subir esta carpeta y activar **GitHub Pages** → Source: GitHub Actions.
3. URL: `https://dfdomin.github.io/iub-docente/`

## Uso local

```bash
cd iub-docente
python3 -m http.server 8090
```

Abrir http://localhost:8090/

## Flujo

1. `index.html` — login docente (`verify_teacher_login` en Supabase unificado).
2. Elegir módulo (TGA04, TGA05, ADM18…).
3. `participacion.html` — misma interfaz, datos filtrados por `OFFERING_CODE`.

Los sitios de estudiantes (`tga04-neurobiz`, `tga05-neurobiz`) pueden enlazar aquí:

`https://dfdomin.github.io/iub-docente/?module=TGA05`
