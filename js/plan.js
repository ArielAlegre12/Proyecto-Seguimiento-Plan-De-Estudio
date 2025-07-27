const planEstudio = {
  "carrera": "Licenciatura en Sistemas de Información",
  "años": [
    {
      "anio": 1,
      "cuatrimestres": [
        {
          "periodo": "1° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-24",
              "nombre": "Álgebra",
              "correlativas": { "paraCursar": [], "paraAprobar": [] }
            },
            {
              "codigo": "EXAG-671",
              "nombre": "Algoritmos y Estructuras de Datos I",
              "correlativas": { "paraCursar": [], "paraAprobar": [] }
            }
          ]
        },
        {
          "periodo": "2° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-672",
              "nombre": "Algoritmos y Estructuras de Datos II",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-671", "condicion": "regular" }
              ], "paraAprobar": [
                { "codigo": "EXAG-671", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-673",
              "nombre": "Lógica y Matemática Computacional",
              "correlativas": { "paraCursar": [], "paraAprobar": [
                { "codigo": "EXAG-24", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-674",
              "nombre": "Sistemas y Organizaciones",
              "correlativas": { "paraCursar": [], "paraAprobar": [] }
            }
          ]
        }
      ]
    },
    {
      "anio": 2,
      "cuatrimestres": [
        {
          "periodo": "1° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-65",
              "nombre": "Cálculo Diferencial e Integral",
              "correlativas": { "paraCursar": [
                 { "codigo": "EXAG-673", "condicion": "regular" },
                { "codigo": "EXAG-24", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-673", "condicion": "aprobada" },
                { "codigo": "EXAG-24", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-694",
              "nombre": "Arquitectura y Organización de Computadoras",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-671", "condicion": "aprobada" },
                { "codigo": "EXAG-673", "condicion": "regular" }
              ], "paraAprobar": [
                { "codigo": "EXAG-673", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-675",
              "nombre": "Paradigmas y Lenguajes",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-671", "condicion": "aprobada" },
                { "codigo": "EXAG-672", "condicion": "regular" }
              ], "paraAprobar": [
                { "codigo": "EXAG-672", "condicion": "aprobada" }
              ] }
            }
          ]
        },
        {
          "periodo": "2° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-270",
              "nombre": "Sistemas Operativos",
              "correlativas": { "paraCursar": [
                   { "codigo": "EXAG-694", "condicion": "regular" },
                { "codigo": "EXAG-672", "condicion": "aprobada" }  
              ], "paraAprobar": [
                { "codigo": "EXAG-672", "condicion": "aprobada" },
                { "codigo": "EXAG-694", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-676",
              "nombre": "Programación Orientada a Objetos",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-675", "condicion": "regular" },
                { "codigo": "EXAG-672", "condicion": "aprobada" } 
              ], "paraAprobar": [
                { "codigo": "EXAG-675", "condicion": "aprobada" },
                { "codigo": "EXAG-672", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-677",
              "nombre": "Administración y Gestión de Organizaciones",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-674", "condicion": "regular" }
              ], "paraAprobar": [
                { "codigo": "EXAG-674", "condicion": "aprobada" }
              ] }
            }
          ]
        }
      ]
    },
    {
      "anio": 3,
      "cuatrimestres": [
        {
          "periodo": "1° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-678",
              "nombre": "Taller de Programación I",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-676", "condicion": "regular" },
                { "codigo": "EXAG-675", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-676", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-679",
              "nombre": "Comunicaciones de Datos",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-270", "condicion": "regular" },
                { "codigo": "EXAG-694", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-270", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-680",
              "nombre": "Ingeniería de Software I",
              "correlativas": { "paraCursar": [
                {"codigo": "EXAG-676", "condicion": "regular" },
                { "codigo": "EXAG-677", "condicion": "regular" },
                { "codigo": "EXAG-674", "condicion": "aprobada" }   
              ], "paraAprobar": [
                { "codigo": "EXAG-676", "condicion": "aprobada" },
                { "codigo": "EXAG-677", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-544",
              "nombre": "Inglés Técnico Informático (extracurricular)",
              "correlativas": { "paraCursar": [], "paraAprobar": [] }
            }
          ]
        },
        {
          "periodo": "2° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-681",
              "nombre": "Taller de Programación II",
              "correlativas": { "paraCursar": [
                {"codigo": "EXAG-678", "condicion": "regular" },
                { "codigo": "EXAG-680", "condicion": "regular" },
                { "codigo": "EXAG-676", "condicion": "aprobada" },
                { "codigo": "EXAG-670", "condicion": "aprobada" }            
              ], "paraAprobar": [
                { "codigo": "EXAG-678", "condicion": "aprobada" },
                { "codigo": "EXAG-680", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-682",
              "nombre": "Bases de Datos I",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-676", "condicion": "regular" },
                { "codigo": "EXAG-694", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-680", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-17",
              "nombre": "Probabilidad y Estadística",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-65", "condicion": "regular" }
              ], "paraAprobar": [
                { "codigo": "EXAG-65", "condicion": "aprobada" }
              ] }
            }
          ]
        }
      ]
    },
    {
      "anio": 4,
      "cuatrimestres": [
        {
          "periodo": "1° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-683",
              "nombre": "Ingeniería de Software II",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-680", "condicion": "regular" },
                { "codigo": "EXAG-677", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-680", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-684",
              "nombre": "Economía Aplicada",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-680", "condicion": "regular" },
                { "codigo": "EXAG-677", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-680", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-685",
              "nombre": "Teoría de la Computación",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-17", "condicion": "regular" },
                { "codigo": "EXAG-694", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-17", "condicion": "aprobada" },
                { "codigo": "EXAG-694", "condicion": "aprobada" }
              ] }
            }
          ]
        },
        {
          "periodo": "2° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-686",
              "nombre": "Redes de Datos",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-679", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-679", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-687",
              "nombre": "Bases de Datos II",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-682", "condicion": "regular" },
                { "codigo": "EXAG-680", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-682", "condicion": "aprobada" },
              ] }
            },
            {
              "codigo": "EXAG-688",
              "nombre": "Métodos Computacionales",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-17", "condicion": "regular" },
                { "codigo": "EXAG-65", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-17", "condicion": "aprobada" },
              ] }
            }
          ]
        }
      ]
    },
    {
      "anio": 5,
      "cuatrimestres": [
        {
          "periodo": "1° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-689",
              "nombre": "Proyecto Final de Carrera",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-686", "condicion": "regular" },
                { "codigo": "EXAG-687", "condicion": "regular" },
                { "codigo": "EXAG-683", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-681", "condicion": "aprobada" },
                { "codigo": "EXAG-17", "condicion": "aprobada" },
                { "codigo": "EXAG-544", "condicion": "aprobada" },
                { "codigo": "EXAG-683", "condicion": "aprobada" },
                { "codigo": "EXAG-684", "condicion": "aprobada" },
                { "codigo": "EXAG-685", "condicion": "aprobada" },
                { "codigo": "EXAG-686", "condicion": "aprobada" },
                { "codigo": "EXAG-687", "condicion": "aprobada" },
                { "codigo": "EXAG-688", "condicion": "aprobada" },
                { "codigo": "EXAG-689", "condicion": "aprobada" },
                { "codigo": "EXAG-690", "condicion": "aprobada" },
                { "codigo": "EXAG-691", "condicion": "aprobada" },
                { "codigo": "EXAG-692", "condicion": "aprobada" },
                { "codigo": "EXAG-693", "condicion": "aprobada" }
              ] }
            },
            {
              "codigo": "EXAG-690",
              "nombre": "Auditoría y Seguridad Informática",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-686", "condicion": "regular" },
                { "codigo": "EXAG-687", "condicion": "regular" },
                { "codigo": "EXAG-683", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-686", "condicion": "aprobada" },
                { "codigo": "EXAG-687", "condicion": "aprobada" }
              ] }
            }
          ]
        },
        {
          "periodo": "2° Cuatrimestre",
          "materias": [
            {
              "codigo": "EXAG-696",
              "nombre": "Integración de Redes (Optativa II)",
              "correlativas": { "paraCursar": [], "paraAprobar": [] }
            },
            {
              "codigo": "EXAG-697",
              "nombre": "Arquitecturas y SO Avanzados (Optativa II)",
              "correlativas": { "paraCursar": [], "paraAprobar": [] }
            },
            {
              "codigo": "EXAG-698",
              "nombre": "Diseño Web Centrado en el Usuario (Optativa III)",
              "correlativas": { "paraCursar": [
                { "codigo": "EXAG-687", "condicion": "regular" },
                { "codigo": "EXAG-683", "condicion": "aprobada" }
              ], "paraAprobar": [
                { "codigo": "EXAG-687", "condicion": "aprobada" }
              ] }
            }
          ]
        }
      ]
    }
  ],
  "tituloIntermedio": {
    "anio": 3,
    "nombre": "Analista Programador Universitario"
  }
};
