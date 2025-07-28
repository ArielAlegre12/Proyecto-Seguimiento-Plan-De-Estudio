document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("plan");
    let estadoMaterias = {};

    // Cargar estado previo desde localStorage
    const savedData = localStorage.getItem("estadoMaterias");
    if (savedData) {
        estadoMaterias = JSON.parse(savedData);
    }

    // Contar total de materias de la carrera
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
                    <option value="aprobada_final">Aprobada (Examen Final)</option>
                    <option value="aprobada_promo">Promocionada</option>
                `;

                // Restaurar estado guardado
                if (estadoMaterias[materia.codigo]) {
                    select.value = estadoMaterias[materia.codigo];
                }

                // Mensaje de error
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
                if (req.condicion === "aprobada") return estadoReq === "aprobada_final" || estadoReq === "aprobada_promo";
                if (req.condicion === "regular") return estadoReq === "regular" || (estadoReq && estadoReq.includes("aprobada"));
                return false;
            });
        }
        if (nuevoEstado.includes("aprobada")) {
            return materia.correlativas.paraAprobar.every(req => {
                const estadoReq = estadoMaterias[req.codigo];
                return estadoReq && estadoReq.includes("aprobada");
            });
        }
        return true;
    }

    // Cálculo de progreso
    function calcularProgreso() {
        let aprobadas = 0;
        let promocionadas = 0;
        let porFinal = 0;
        let regulares = 0;

        for (const estado of Object.values(estadoMaterias)) {
            if (estado === "aprobada_promo") {
                aprobadas++;
                promocionadas++;
            } else if (estado === "aprobada_final") {
                aprobadas++;
                porFinal++;
            } else if (estado === "regular") {
                regulares++;
            }
        }

        // Actualizar contadores
        document.getElementById("count-aprobadas").textContent = aprobadas;
        document.getElementById("count-promocionadas").textContent = promocionadas;
        document.getElementById("count-final").textContent = porFinal;
        document.getElementById("count-regulares").textContent = regulares;

        // Porcentajes
        const porcentajeAprobadas = ((aprobadas / totalMaterias) * 100).toFixed(2);
        const porcentajeCompletadas = (((aprobadas + regulares) / totalMaterias) * 100).toFixed(2);

        const materiasIntermedio = contarMateriasHasta(planEstudio.tituloIntermedio.anio);
        const aprobadasIntermedio = contarAprobadasHasta(planEstudio.tituloIntermedio.anio);
        const porcentajeIntermedio = ((aprobadasIntermedio / materiasIntermedio) * 100).toFixed(2);

        const porcentajeLicenciatura = ((aprobadas / totalMaterias) * 100).toFixed(2);

        // Actualizar barras
        document.getElementById("barra-aprobadas").style.width = `${porcentajeAprobadas}%`;
        document.getElementById("barra-total").style.width = `${porcentajeCompletadas}%`;
        document.getElementById("barra-intermedio").style.width = `${porcentajeIntermedio}%`;
        document.getElementById("barra-licenciatura").style.width = `${porcentajeLicenciatura}%`;

        // Actualizar texto
        document.getElementById("porcentaje-aprobadas").textContent = `${porcentajeAprobadas}%`;
        document.getElementById("porcentaje-total").textContent = `${porcentajeCompletadas}%`;
        document.getElementById("porcentaje-intermedio").textContent = `${porcentajeIntermedio}%`;
        document.getElementById("porcentaje-licenciatura").textContent = `${porcentajeLicenciatura}%`;
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
                        if (estadoMaterias[m.codigo]?.includes("aprobada")) count++;
                    });
                });
            }
        });
        return count;
    }


    // ----- NUEVO: Sección para mostrar correlativas ------

    // Elementos
    const selectMateria = document.getElementById("select-materia");
    const infoCorrelativas = document.getElementById("info-correlativas");

    // Obtener todas las materias en un array plano
    function obtenerTodasLasMaterias() {
        const materias = [];
        planEstudio.años.forEach(anio => {
            anio.cuatrimestres.forEach(cuatri => {
                cuatri.materias.forEach(materia => {
                    materias.push(materia);
                });
            });
        });
        return materias;
    }

    const todasLasMaterias = obtenerTodasLasMaterias();

    // Llenar select de materias
    todasLasMaterias.forEach(materia => {
        const option = document.createElement("option");
        option.value = materia.codigo;
        option.textContent = `${materia.codigo} - ${materia.nombre}`;
        selectMateria.appendChild(option);
    });

    // Mostrar correlativas para la materia seleccionada
    function mostrarCorrelativas(codigoMateria) {
        const materia = todasLasMaterias.find(m => m.codigo === codigoMateria);
        if (!materia) {
            infoCorrelativas.innerHTML = "<p>Materia no encontrada.</p>";
            return;
        }

        const paraCursar = materia.correlativas.paraCursar;
        const paraAprobar = materia.correlativas.paraAprobar;

        // Correlativas para regular (condicion === "regular" en paraCursar)
        const paraRegularizar = paraCursar.filter(cor => cor.condicion === "regular");

        function formatCorrelativas(lista) {
            if (lista.length === 0) return "<em>No tiene correlativas</em>";

            return lista.map(cor => {
                const materiaRelacionada = todasLasMaterias.find(m => m.codigo === cor.codigo);
                const nombreMateria = materiaRelacionada ? materiaRelacionada.nombre : "Nombre no encontrado";
                return `${cor.codigo} - ${nombreMateria} (${cor.condicion})`;
            }).join(", ");
        }


        infoCorrelativas.innerHTML = `
            <p><strong>Correlativas para cursar:</strong> ${formatCorrelativas(paraCursar)}</p>
            <p><strong>Correlativas para regularizar:</strong> ${paraRegularizar.length > 0 ? formatCorrelativas(paraRegularizar) : "<em>No tiene correlativas específicas para regularizar</em>"}</p>
            <p><strong>Correlativas para aprobar/promocionar:</strong> ${formatCorrelativas(paraAprobar)}</p>
        `;
    }

    selectMateria.addEventListener("change", (e) => {
        mostrarCorrelativas(e.target.value);
    });

    calcularProgreso();
});
