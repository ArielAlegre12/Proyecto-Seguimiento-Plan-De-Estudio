document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("plan");

    let estadoMaterias = {};

    // Cargar estado previo desde localStorage
    const savedData = localStorage.getItem("estadoMaterias");
    if (savedData) {
        estadoMaterias = JSON.parse(savedData);
    }

    // Contar total materias
    let totalMaterias = 0;
    planEstudio.años.forEach(anio => {
        anio.cuatrimestres.forEach(cuatri => {
            totalMaterias += cuatri.materias.length;
        });
    });

    // Renderizar plan
    planEstudio.años.forEach(anio => {
        const anioDiv = document.createElement("div");
        anioDiv.classList.add("anio");
        anioDiv.innerHTML = `<h2>Año ${anio.anio}</h2>`;

        anio.cuatrimestres.forEach(cuatri => {
            const cuatriDiv = document.createElement("div");
            cuatriDiv.classList.add("cuatrimestre");
            cuatriDiv.innerHTML = `<h3>${cuatri.periodo}</h3>`;

            cuatri.materias.forEach(materia => {
                const materiaDiv = document.createElement("div");
                materiaDiv.classList.add("materia");
                materiaDiv.innerHTML = `<span><strong>${materia.codigo}</strong> - ${materia.nombre}</span>`;

                const select = document.createElement("select");
                select.innerHTML = `
                    <option value="no_cursada">No cursada</option>
                    <option value="regular">Regular</option>
                    <option value="aprobada">Aprobada</option>
                `;

                // Restaurar estado guardado
                if (estadoMaterias[materia.codigo]) {
                    select.value = estadoMaterias[materia.codigo];
                }

                // Crear mensaje de error local
                const mensajeErrorLocal = document.createElement("div");
                mensajeErrorLocal.classList.add("mensaje-error");
                mensajeErrorLocal.style.minHeight = "18px";
                mensajeErrorLocal.style.color = "red";
                mensajeErrorLocal.style.fontSize = "0.85em";
                mensajeErrorLocal.style.visibility = "hidden";

                select.addEventListener("change", function (e) {
                    const nuevoEstado = e.target.value;
                    const anteriorEstado = estadoMaterias[materia.codigo] || "no_cursada";

                    if (!cumpleCorrelativas(materia, nuevoEstado)) {
                        mensajeErrorLocal.textContent = `No cumplís las correlativas.`;
                        mensajeErrorLocal.style.visibility = "visible";

                        e.target.value = anteriorEstado; // revertir

                        clearTimeout(mensajeErrorLocal.timeoutId);
                        mensajeErrorLocal.timeoutId = setTimeout(() => {
                            mensajeErrorLocal.style.visibility = "hidden";
                        }, 5000);

                        return;
                    }

                    // Si pasa validación
                    mensajeErrorLocal.style.visibility = "hidden";
                    estadoMaterias[materia.codigo] = nuevoEstado;
                    localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
                    calcularProgreso();
                });

                materiaDiv.appendChild(select);
                materiaDiv.appendChild(mensajeErrorLocal);
                cuatriDiv.appendChild(materiaDiv);
            });

            anioDiv.appendChild(cuatriDiv);
        });

        container.appendChild(anioDiv);
    });

    // Validación de correlativas
    function cumpleCorrelativas(materia, nuevoEstado) {
        if (nuevoEstado === "regular") {
            return materia.correlativas.paraCursar.every(req => {
                const estadoReq = estadoMaterias[req.codigo];
                if (req.condicion === "aprobada") return estadoReq === "aprobada";
                if (req.condicion === "regular") return estadoReq === "regular" || estadoReq === "aprobada";
                return false;
            });
        }
        if (nuevoEstado === "aprobada") {
            return materia.correlativas.paraAprobar.every(req => {
                const estadoReq = estadoMaterias[req.codigo];
                return estadoReq === "aprobada";
            });
        }
        return true;
    }

    // Cálculo de progreso
    function calcularProgreso() {
        let aprobadas = 0;
        let regulares = 0;

        for (const estado of Object.values(estadoMaterias)) {
            if (estado === "aprobada") aprobadas++;
            else if (estado === "regular") regulares++;
        }

        const porcentajeAprobadas = ((aprobadas / totalMaterias) * 100).toFixed(2);
        const porcentajeCompletadas = (((aprobadas + regulares) / totalMaterias) * 100).toFixed(2);

        const materiasIntermedio = contarMateriasHasta(planEstudio.tituloIntermedio.anio);
        const aprobadasIntermedio = contarAprobadasHasta(planEstudio.tituloIntermedio.anio);
        const porcentajeIntermedio = ((aprobadasIntermedio / materiasIntermedio) * 100).toFixed(2);

        // ✅ NUEVO: progreso total de la carrera (solo aprobadas)
        const porcentajeTotalCarrera = ((aprobadas / totalMaterias) * 100).toFixed(2);

        // Actualizar barras
        document.getElementById("barra-aprobadas").style.width = `${porcentajeAprobadas}%`;
        document.getElementById("barra-total").style.width = `${porcentajeCompletadas}%`;
        document.getElementById("barra-intermedio").style.width = `${porcentajeIntermedio}%`;
        document.getElementById("barra-total-carrera").style.width = `${porcentajeTotalCarrera}%`;

        // Actualizar texto
        document.getElementById("porcentaje-aprobadas").textContent = `${porcentajeAprobadas}%`;
        document.getElementById("porcentaje-total").textContent = `${porcentajeCompletadas}%`;
        document.getElementById("porcentaje-intermedio").textContent = `${porcentajeIntermedio}%`;
        document.getElementById("porcentaje-total-carrera").textContent = `${porcentajeTotalCarrera}%`;
    }


    function contarMateriasHasta(anioLimite) {
        let count = 0;
        planEstudio.años.forEach(anio => {
            if (anio.anio <= anioLimite) {
                anio.cuatrimestres.forEach(cuatri => count += cuatri.materias.length);
            }
        });
        return count;
    }

    function contarAprobadasHasta(anioLimite) {
        let count = 0;
        planEstudio.años.forEach(anio => {
            if (anio.anio <= anioLimite) {
                anio.cuatrimestres.forEach(cuatri => {
                    cuatri.materias.forEach(m => {
                        if (estadoMaterias[m.codigo] === "aprobada") count++;
                    });
                });
            }
        });
        return count;
    }

    calcularProgreso();
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});


window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
