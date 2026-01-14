

export interface Exercise {
    name: string;
    sets?: string;
    reps?: string;
    rest?: string;
    description: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
}

export interface TrainingModule {
    id: string;
    title: string;
    description: string;
    fullDescription?: string;
    iconName: string; // We will handle icon mapping in the component
    exercises: Exercise[];
    videos: Video[];
    metrics?: string[]; // For AI analysis
}

export const trainingModules: Record<string, TrainingModule> = {
    strength: {
        id: "strength",
        title: "Fuerza",
        description: "Entrenamiento de fuerza específico para baloncesto",
        fullDescription: `El entrenamiento de fuerza es un pilar fundamental en la preparación física de los jugadores de baloncesto, complementando aspectos vitales como la potencia, la velocidad, el control y la resistencia. A medida que el nivel competitivo se intensifica, el entrenamiento físico se vuelve más especializado para maximizar el rendimiento individual y colectivo.

El objetivo central de este módulo es desarrollar las capacidades atléticas para que los jugadores sean fuertes, rápidos, coordinados e inteligentes. Esto es crucial para enfrentar la alta dinámica, la velocidad y la permanente lucha por los espacios que exige el juego moderno.

Los beneficios de un régimen de fuerza adecuado son significativos: se logra un mejor rendimiento general en la cancha, un mayor acondicionamiento físico, la optimización de la recuperación, y lo más importante, la prevención de lesiones y una mayor estabilidad articular. Este tipo de entrenamiento incrementa el rendimiento en sprints y saltos, y es vital para la capacidad de acelerar, desacelerar y cambiar de dirección, acciones primordiales en un juego intermitente de alta intensidad.

Para lograr estos resultados, abordaremos el entrenamiento de fuerza en dos dimensiones:
1. Fuerza General: Dirigida a mejorar la resistencia y la contracción muscular, preparando al cuerpo para movimientos más específicos.
2. Fuerza Específica: Enfocada directamente en los movimientos propios del baloncesto, incluyendo la fuerza de desplazamiento, la fuerza de contacto (resistencia física), la fuerza de salto (potencia vertical y explosiva) y la fuerza de lanzamiento (estabilidad y precisión).

Exploraremos métodos avanzados que se transfieren bien al juego, tales como:
• Levantamiento de Pesas Olímpico: Una herramienta poderosa para mejorar el rendimiento al estimular el sistema neuromuscular y aumentar la estabilidad articular. Se estudiarán ejercicios clave como el clean (envión), el jerk (tirón) y el snatch (arranque), que mejoran la técnica de triple extensión, el movimiento de inmersión y explosión, y la transferencia de potencia de todo el cuerpo, respectivamente.
• Entrenamiento Excéntrico: Fundamental para el control de movimiento bajo resistencia, como el aterrizaje después de un salto o el frenado rápido luego de un sprint.

Es fundamental destacar que la técnica y la forma adecuada son esenciales, no solo para maximizar la eficiencia y las ganancias, sino también para prevenir lesiones graves. Además, el programa debe ser individualizado y adaptado a las necesidades, la edad, el historial de lesiones y la posición de cada atleta, asegurando que el trabajo de fuerza se combine con ejercicios específicos del deporte para un enfoque integral.`,
        iconName: "Strength",
        metrics: ["Peso levantado", "Repeticiones"],
        exercises: [
            {
                name: "Sentadillas con Salto",
                sets: "4 series",
                reps: "8-10 repeticiones",
                rest: "90 segundos",
                description: "Ejercicio explosivo para mejorar el salto vertical",
            },
            {
                name: "Peso Muerto",
                sets: "4 series",
                reps: "6-8 repeticiones",
                rest: "120 segundos",
                description: "Desarrollo de fuerza en la cadena posterior",
            },
            {
                name: "Press de Banca",
                sets: "4 series",
                reps: "8-10 repeticiones",
                rest: "90 segundos",
                description: "Fortalecimiento del tren superior",
            },
            {
                name: "Dominadas",
                sets: "3 series",
                reps: "Máximo de repeticiones",
                rest: "90 segundos",
                description: "Desarrollo de la fuerza de tracción",
            },
            {
                name: "Plancha",
                sets: "3 series",
                reps: "30-45 segundos",
                rest: "60 segundos",
                description: "Fortalecimiento del core",
            },
        ],
        videos: [
            {
                id: "X7Y0AyfXZ8k",
                title: "Entrenamiento de Fuerza para Baloncesto",
                description: "Ejercicios de fuerza específicos para jugadores de baloncesto",
            },
        ],
    },
    cardio: {
        id: "cardio",
        title: "Cardio",
        description: "Entrenamiento de resistencia y velocidad",
        fullDescription: `El entrenamiento cardiovascular, en el contexto del baloncesto, debe entenderse como parte de un proceso complejo regido por los principios básicos del entrenamiento, buscando optimizar el rendimiento y prevenir riesgos como el sobreentrenamiento. La etapa de iniciación es crucial y debe aplicarse siguiendo una serie de normas de carácter general.

I. Principios Fundamentales para la Iniciación
La fase inicial del entrenamiento, especialmente la preparación física, requiere el conocimiento de normas básicas para asegurar la eficacia del proceso y evitar situaciones de riesgo.

1. Principio de Progresión: Las exigencias planteadas al deportista deben aumentar de forma sistemática y gradual. No se debe pasar de una inactividad (como el periodo de verano) a entrenar intensamente (por ejemplo, 7 días a la semana durante 2 horas al día), ya que un inicio no gradual puede someter a los jugadores a un estrés que desemboque en lesiones y mal rendimiento. El entrenamiento debe ir de menos a más en todos los aspectos.
2. Principio de Estímulo Eficaz para el Entrenamiento: El estímulo debe ser suficiente para superar el umbral mínimo de adaptación del jugador, pero sin sobrepasar el umbral de sobreentrenamiento.
3. Principio de Carga Individualizada: Los estímulos de entrenamiento deben corresponderse con la capacidad psicofísica y con las necesidades de cada deportista. Es un error someter al mismo estímulo de carrera a jugadores de diferentes posiciones o capacidades.

II. Naturaleza y Exigencias del Cardio en Baloncesto
El baloncesto es un deporte colectivo de cooperación-oposición y se clasifica como un deporte mixto intermitente de alta intensidad. Desde la perspectiva condicional, exige esfuerzos de alta intensidad durante todo el partido.

• Capacidad Aero-Anaeróbica: Se requiere tanto la capacidad anaeróbica (para acciones explosivas como sprints, saltos y cambios de dirección) como la capacidad aeróbica, la cual es importante para recorrer las distancias requeridas y recuperarse de los constantes esfuerzos anaeróbicos intermitentes a lo largo del juego.
• Fuerza Rápida: El baloncesto es predominantemente un deporte de fuerza rápida, por lo que la mayoría de los estímulos deben estar relacionados con la rapidez y la velocidad.

III. Metodología para el Entrenamiento de la Resistencia (Cardio)
Una de las propuestas metodológicas más utilizadas para el trabajo de la resistencia específica en baloncesto es el entrenamiento mediante juegos en espacios reducidos (JERs), ya que permite una perspectiva integrada de la preparación física, técnica y táctica.
El equipo técnico puede modificar parámetros del juego para influir en la frecuencia cardiaca (FC) y la intensidad del juego, orientando así el trabajo hacia un predominio aeróbico o anaeróbico.

Parámetro del Juego | Orientación Anaeróbica (Mayor intensidad/FC) | Orientación Aeróbica (Menor intensidad/FC)
--- | --- | ---
Número de Jugadores | Menor número de jugadores (ej. 1x1, 2x2) | Mayor número de jugadores (ej. 5x5)
Espacio de Juego | Espacios grandes (ej. toda la pista) | Espacios pequeños (ej. medio campo)
Organización del Tiempo | Regímenes de trabajo intermitentes (mayor intensidad de juego) o continuos (mayor FC máx) | Regímenes de trabajo intermitentes (si el foco es la recuperación) o continuos (si el foco es la resistencia de base)
Reglas Específicas | Prohibición del bote o defensa individual | Libre utilización del bote o defensa zonal

Para la iniciación, donde el objetivo del periodo preparatorio es desarrollar los componentes básicos del rendimiento, se podría iniciar con ejercicios que permitan una orientación más equilibrada (implicación equitativa de sistemas energéticos) o aeróbica, utilizando el ecualizador para ajustar los parámetros.

IV. Control de la Carga y Prevención de Lesiones
La prevención de lesiones debe ser un componente fundamental dentro del programa de entrenamiento. Esto es crucial al inicio para evitar que el estrés por el aumento de la carga desemboque en lesiones.

• Riesgo por Carga: Tanto el exceso como el déficit en la carga de entrenamiento suponen un aumento en el riesgo de lesión.
• Monitoreo de Carga: Una herramienta práctica para monitorizar la carga de entrenamiento es el Índice de Foster. Este se calcula multiplicando la intensidad percibida por el jugador (RPE, escala de Borg) por el volumen de la sesión (minutos).

Un entrenamiento bien planificado debe basarse en un volumen e intensidad determinados para que los jugadores puedan mantener su estado de forma, mejorar sus destrezas y preservar su estado de salud, evitando lesiones que impliquen un reposo deportivo obligado.`,
        iconName: "Cardio",
        metrics: ["VO2 Max", "Recuperación cardíaca"],
        exercises: [
            {
                name: "Carreras de Velocidad",
                sets: "6 series",
                reps: "30 metros",
                rest: "60 segundos",
                description: "Mejora de la velocidad y aceleración",
            },
            {
                name: "Sprints con Cambios de Dirección",
                sets: "4 series",
                reps: "45 segundos",
                rest: "90 segundos",
                description: "Simulación de movimientos de juego",
            },
            {
                name: "Entrenamiento HIIT",
                sets: "4 series",
                reps: "30 segundos trabajo / 30 segundos descanso",
                rest: "2 minutos entre series",
                description: "Mejora de la resistencia anaeróbica",
            },
            {
                name: "Saltos de Cuerda",
                sets: "3 series",
                reps: "2 minutos",
                rest: "60 segundos",
                description: "Coordinación y resistencia",
            },
            {
                name: "Burpees",
                sets: "3 series",
                reps: "10 repeticiones",
                rest: "60 segundos",
                description: "Ejercicio completo de cuerpo",
            },
        ],
        videos: [
            {
                id: "Zt8Tb8yqX8Y",
                title: "Entrenamiento de Resistencia",
                description: "Mejora tu resistencia para el baloncesto",
            },
        ],
    },
    technical: {
        id: "technical",
        title: "Técnica",
        description: "Mejora tus habilidades técnicas",
        fullDescription: `La técnica individual, o la correcta ejecución de los fundamentos, es el componente basal e indispensable sobre el que se cimienta el desarrollo integral y el rendimiento competitivo de un jugador de baloncesto. La primacía de la técnica se resume en la pregunta que responde: "¿cómo puedo hacerlo?". Sin una base técnica sólida, el "edificio baloncestístico" corre el riesgo de colapsar, independientemente de otras capacidades.

I. La Técnica y el Imperativo de la Biomecánica
La técnica deportiva se define como el conjunto de modelos biomecánicos y anatómico-funcionales de los movimientos realizados para alcanzar la máxima eficiencia posible. El logro de máximos rendimientos está estrechamente relacionado con la efectividad de estos movimientos técnicos.

1. Fundamentos Individuales Clave: La técnica abarca habilidades esenciales que deben ser desarrolladas y automatizadas por el deportista. Estos fundamentos incluyen:
    ◦ Equilibrio corporal y posición básica ofensiva (triple amenaza).
    ◦ Movimientos básicos de pies y manos, como paradas, pivotes y saltos.
    ◦ Fundamentos ofensivos con balón (pase, bote y tiro).
    ◦ Fundamentos defensivos (defensa 1x1, anticipación y rebote defensivo).

2. Perfección en la Ejecución: La calidad del entrenamiento técnico supera la cantidad. Si un deportista entrena de forma incorrecta, se convertirá en el mejor ejecutando esa técnica errónea. Por ello, es crucial que el entrenamiento sea "perfecto" para alcanzar la perfección.

II. Interdependencia y Estabilidad Técnica bajo Estrés
El entrenamiento técnico no puede desvincularse del contexto real de juego. Debe adherirse a los principios básicos del entrenamiento deportivo para maximizar su eficacia.

1. Relación Técnica-Táctica: La técnica proporciona al jugador la capacidad de ejecución, mientras que la táctica determina el momento de su aplicación ("¿cuándo puedo utilizarlo?"). Un mayor dominio técnico incrementa directamente la probabilidad de éxito en la ejecución de la acción táctica seleccionada. En el proceso de aprendizaje, si se enfatiza una (técnica o táctica), la otra debe atenuarse para facilitar la asimilación, especialmente en etapas iniciales de formación.
2. Principio de Especialización y Velocidad: El baloncesto es un deporte de fuerza rápida. Por lo tanto, el entrenamiento técnico debe orientarse a la rapidez y velocidad de ejecución, trabajando a máxima velocidad (salvo en las fases de asimilación de la técnica).
3. Impacto de la Fatiga y la Biomecánica Avanzada: La fatiga física es un factor que puede distorsionar la técnica correcta y su biomecánica. La influencia de la resistencia muscular puede incrementar la descoordinación motriz y, por ende, reducir la efectividad deportiva.
    ◦ Evidencia en el Tiro Libre: Estudios han demostrado que el estado de fatiga provoca una variación negativamente significativa en la efectividad del tiro libre. Esta alteración afecta específicamente a la fase inicial del lanzamiento, notándose diferencias significativas en el ángulo inicial del brazo.
    ◦ Necesidad de Entrenamiento Especializado: Para contrarrestar este efecto, es fundamental implementar un entrenamiento especializado que potencie la resistencia y estabilice eficientemente la biomecánica de los movimientos, asegurando que la técnica se mantenga constante incluso bajo altos niveles de estrés condicional.

En definitiva, la técnica debe ser entrenada de manera continua y controlada (Principio de la carga continua), buscando no solo la asimilación del gesto, sino su automatización y estabilización para que el deportista pueda aplicarla con éxito y agilidad mental, incluso cuando la fatiga o la complejidad táctica son elevadas.`,
        iconName: "Technical",
        metrics: ["% de acierto en tiro", "Pérdidas de balón"],
        exercises: [
            {
                name: "Tiro Libre",
                sets: "5 series",
                reps: "10 tiros",
                rest: "60 segundos",
                description: "Perfeccionamiento de la técnica de tiro",
            },
            {
                name: "Dribbling",
                sets: "4 series",
                reps: "2 minutos",
                rest: "60 segundos",
                description: "Control del balón y cambios de mano",
            },
            {
                name: "Pases y Recepción",
                sets: "3 series",
                reps: "5 minutos",
                rest: "90 segundos",
                description: "Precisión y timing en los pases",
            },
            {
                name: "Defensa",
                sets: "3 series",
                reps: "3 minutos",
                rest: "60 segundos",
                description: "Posición defensiva y movimientos",
            },
            {
                name: "Movimientos sin Balón",
                sets: "3 series",
                reps: "2 minutos",
                rest: "60 segundos",
                description: "Cortes y cambios de dirección",
            },
        ],
        videos: [
            {
                id: "VBl0HxrQw1Y",
                title: "Fundamentos del Baloncesto",
                description: "Técnicas básicas del baloncesto",
            },
        ],
    },
    plyometrics: {
        id: "plyometrics",
        title: "Pliometría",
        description: "Explosividad y Potencia",
        fullDescription: `La pliometría representa una metodología de entrenamiento indispensable en el baloncesto moderno debido a su contribución directa al desarrollo de la fuerza explosiva, una cualidad física fundamental en este deporte de alta intensidad y movimientos rápidos.

I. Fundamento Fisiológico y Biomecánica del Movimiento
La pliometría es un tipo de entrenamiento físico que se enfoca en movimientos veloces y potentes, diseñados para optimizar la capacidad musculotendinosa de generar poder. Estos ejercicios se basan en la realización rápida del ciclo de estiramiento-acortamiento muscular (ir de la desaceleración a la aceleración), lo que mejora la fuerza, la velocidad y la potencia de los músculos, especialmente en el tren inferior.
En el baloncesto, el logro de máximos rendimientos está intrínsecamente relacionado con la efectividad de los movimientos técnicos, y el salto vertical efectivo depende de una sincronización perfecta de grupos musculares como cuádriceps, isquiotibiales y glúteos, y de la aplicación óptima de fuerzas en la dirección adecuada para lograr la máxima elevación.

II. Eficacia en el Rendimiento Específico del Baloncesto
La eficacia de la pliometría se manifiesta directamente en habilidades cruciales del juego:

1. Salto Vertical y Potencia: El salto vertical es una habilidad fundamental para jugadores de todas las posiciones, ya sea para bloquear, realizar un mate o ganar un rebote. Los estudios han demostrado que la pliometría no solo mejora la altura de salto, sino también la velocidad de obtención de la altura máxima. La explosividad en el salto suele ser un factor determinante en la cancha.
2. Habilidad para Repetir Sprints (RSA): El baloncesto exige numerosos cambios de ritmo, sprints a intensidades submáximas y máximas, y aceleraciones. El trabajo pliométrico es un componente habitual en el entrenamiento de jugadores de baloncesto, ya que contribuye a mejorar las acciones explosivas y la RSA.
3. Fases Sensibles del Desarrollo: El entrenamiento pliométrico, al centrarse en la fuerza-velocidad y fuerza-resistencia, se vuelve un componente clave de la preparación física específica. Las fases sensibles para el desarrollo de la fuerza-velocidad, la fuerza-resistencia y la fuerza máxima se encuentran en el período evolutivo de la categoría cadete (14 a 16 años) y juvenil (16 a 18 años).

III. Consideraciones Metodológicas y Prevención de Lesiones
La implementación de la pliometría debe integrarse dentro de un plan de entrenamiento sistemático y bien controlado, priorizando la salud del deportista.

1. Progresión y Calidad: Es fundamental que el entrenamiento pliométrico sea perfecto, ya que realizar la técnica de manera incorrecta repetidamente solo resultará en la automatización de un error. Se recomienda una progresión cuidadosa para evitar lesiones. Se debe iniciar con ejercicios de baja intensidad y aumentar gradualmente la complejidad y el impacto, asegurando que la técnica sea la adecuada en todo momento.
    ◦ Ejemplos de Progresión:
        ▪ Principiantes: Concentrarse en saltos de poca altura, como box jumps a baja altura, o ejercicios de aterrizaje enfocados en la absorción de impacto. Es crucial que en las categorías de formación no se trabaje con cargas externas hasta que los jugadores controlen su peso corporal con soltura.
        ▪ Avanzados: Pueden progresar a saltos más complejos como drop jumps (caídas controladas desde una caja seguidas de un salto inmediato) y saltos en profundidad desde mayor altura.
2. Monitoreo y Recuperación: La prevención de lesiones es un objetivo primordial del cuerpo técnico, que busca que los jugadores rindan al máximo en el mayor número posible de partidos. El baloncesto es un deporte de incidencia lesional media-alta, siendo las lesiones en miembros inferiores las más frecuentes, muchas veces originadas por sobrecargas, aterrizajes y caídas.
    ◦ Para reducir el riesgo, es esencial supervisar la fatiga y garantizar una recuperación adecuada. Se recomienda un descanso de al menos 48 horas entre sesiones pliométricas intensas.

El control riguroso de la carga de entrenamiento es vital, ya que tanto el exceso como el déficit en la carga suponen un aumento en el riesgo de lesión.`,
        iconName: "Plyometrics",
        metrics: ["Altura de salto vertical", "Tiempo de contacto con el suelo"],
        exercises: [
            {
                name: "Saltos al cajón (Box Jumps)",
                sets: "4 series",
                reps: "6-8 repeticiones",
                rest: "90 segundos",
                description: "Para explosividad vertical pura.",
            },
            {
                name: "Saltos de profundidad (Depth Jumps)",
                sets: "3 series",
                reps: "5 repeticiones",
                rest: "120 segundos",
                description: "Dejarse caer de un cajón y saltar inmediatamente al tocar el suelo (mejora la reactividad).",
            },
            {
                name: "Saltos laterales (Lateral Bounds)",
                sets: "3 series",
                reps: "8 por lado",
                rest: "60 segundos",
                description: "Esenciales para la defensa y los desplazamientos laterales.",
            },
            {
                name: "Tuck Jumps",
                sets: "3 series",
                reps: "10 repeticiones",
                rest: "60 segundos",
                description: "Saltos llevando las rodillas al pecho rápidamente.",
            },
        ],
        videos: [
            {
                id: "Yt8KjQzQkqk", // Reusing existing video as placeholder/relevant content
                title: "Pliometría para Baloncesto",
                description: "Ejercicios pliométricos para mejorar el salto vertical",
            },
        ],
    },
    agility: {
        id: "agility",
        title: "Agilidad y Footwork",
        description: "Capacidad de desacelerar y cambiar de dirección con control",
        fullDescription: `La agilidad y el juego de pies (footwork) son pilares fundamentales en el baloncesto moderno, un deporte caracterizado por ser mixto, intermitente y de alta intensidad. El rendimiento óptimo de un jugador exige la habilidad para moverse más rápido que los rivales, realizar maniobras a alta velocidad, y ejecutar movimientos explosivos con precisión.

I. Fundamentos Teórico-Conceptuales: Agilidad y Ejecución Técnica
La efectividad de la técnica individual y la capacidad de reacción del deportista están intrínsecamente ligadas a la agilidad y a la destreza motriz.

A. Definición y Componentes de la Agilidad
La agilidad es un atributo clave en el fútbol y otros deportes de equipo, siendo un componente esencial del método de entrenamiento Speed, Agility, and Quickness (SAQ). En su manifestación más completa, incluye la capacidad de aceleración, velocidad máxima y cambios de dirección (COD). La adquisición de un mayor equilibrio y la mejora de la velocidad de reacción permiten al deportista mantener una posición corporal adecuada durante la ejecución técnica y reaccionar con mayor eficacia ante cualquier cambio en el entorno del juego.
La agilidad se clasifica según la necesidad de anticipación cognitiva:
1. Agilidad Programada o Cerrada (Velocidad de Cambio de Dirección): Implica que el patrón de movimiento y los COD están predefinidos. La aplicación de fuerza es predominantemente horizontal.
2. Agilidad No Programada o Abierta (Agilidad Reactiva): Esta es más relevante en el contexto de juego, ya que requiere la capacidad de análisis de un estímulo visual y una respuesta rápida y efectiva. Los estudios han demostrado que existen diferencias significativas en el rendimiento de los atletas en función de su capacidad para leer estos estímulos visuales y reaccionar, lo cual es vital para la toma de decisiones en el juego.

B. El Juego de Pies (Footwork) como Cimiento
El footwork representa un fundamento técnico individual imprescindible, siendo tan vital como los cimientos de un edificio para soportar la construcción baloncestística subsiguiente. El juego de pies adecuado es esencial para asegurar el equilibrio, la velocidad, la potencia y el control del deportista durante la ejecución.
• Pivoteo: Un movimiento técnico esencial que permite al jugador ganar espacio, realizar fintas y proteger el balón bajo presión. El pivote requiere mantener un pie fijo (pie de pivote) y mover el otro con total libertad, como un compás. Es vital no levantar ni arrastrar el pie de pivote, ya que esto resulta en una violación.
• Dribbling/Cruce (Crossover): Movimiento básico que implica un cambio rápido de dirección al botar el balón para superar a un defensor. Los ejercicios de dribbling rápido, como el regate con dos balones o en zigzag, están diseñados para aumentar la velocidad y agilidad mientras se mantiene el control.

II. Evaluación Cuantificación de la Agilidad
Para monitorizar el rendimiento y la progresión del deportista, se emplean tests estandarizados que valoran la velocidad de cambio de dirección.
• T-Test (Semenick, 1990): Una prueba programada que evalúa un bajo número de cambios de dirección (4) de alta complejidad (90° y 180°). El tiempo de duración del test oscila generalmente entre 8.5 a 12 segundos, implicando predominantemente el sistema anaeróbico glucolítico.
• Test de Agilidad de Illinois: Test programado que evalúa un número alto de cambios de dirección (12), con ángulos de 45° y 180°. El recorrido acíclico total es de aproximadamente 65 metros.
• Consideraciones Biomecánicas en la Evaluación: La observación cualitativa de estos tests es importante para apreciar la ubicación de los pies y la postura corporal. Es una falta grave, por ejemplo, cruzar un pie por delante del otro en los giros durante la ejecución del T-Test, ya que compromete la integridad de la postura.

III. Entrenamiento Específico e Integrado
El desarrollo de la agilidad y el footwork debe ser intencional y específico, utilizando herramientas que simulen las demandas del juego.
• Integración en la Práctica (Desarrollo Holístico): Desarrollar jugadores versátiles requiere incorporar acciones de juego en las prácticas que enfaticen el juego de pies, el manejo del balón y la eficiencia. Esto se logra mediante ejercicios versátiles que desafían al atleta física y mentalmente en múltiples roles y posiciones.
• Escalera de Agilidad (Agility Ladder): Es un material complementario que se sugiere utilizar en el entrenamiento. El uso de la escalera de coordinación (o de agilidad) es crucial para trabajar la coordinación, la agilidad y la velocidad. La evidencia sugiere que los ejercicios con escaleras de agilidad son útiles para mejorar la agilidad, el cambio de dirección, el equilibrio y la coordinación motora.
• Ejercicios de Reacción: Son esenciales para el entrenamiento, ayudando a los jugadores a mejorar su conciencia y su tiempo de reacción en la cancha. Un ejemplo es el ejercicio de reflejo de movimientos del compañero, donde un jugador imita los regates y giros del líder para mejorar la agilidad y el tiempo de reacción.

IV. Implicaciones Biomecánicas y Prevención de Lesiones
Un footwork deficiente o alterado por la fatiga incrementa notablemente el riesgo de lesión, siendo la prevención un objetivo primordial del cuerpo técnico.
1. Riesgo de Lesión por Movimiento: El baloncesto es un deporte con una incidencia lesional media-alta. La mayoría de las lesiones se concentran en los miembros inferiores y están frecuentemente asociadas con aterrizajes, caídas y cambios de dirección. Es fundamental trabajar el fortalecimiento de la musculatura y la propiocepción como la mejor estrategia costo-efectiva para la reducción significativa de esguinces de tobillo en atletas.
2. Propiocepción y Estabilidad: La propiocepción es el sentido de la posición y el control neuromuscular del movimiento. Este sistema proporciona una respuesta anticipada o inmediata de los músculos ante posibles caídas o futuras lesiones, manteniendo la congruencia articular.
3. Fatiga y Alteración de la Técnica: La fatiga física es un factor que puede distorsionar la biomecánica de los movimientos técnicos. La fatiga es un condicionante que implica una disminución de la efectividad del tiro libre, afectando la fase inicial del lanzamiento.
La integridad de la postura debe ser preservada en todo momento, evitando cruzar los pies, acercarlos o separarlos demasiado al moverse, para asegurar el equilibrio y el apalancamiento.

--------------------------------------------------------------------------------
Analogía: La Agilidad y el Footwork como un Sistema de Dirección Asistida
La agilidad y el juego de pies en el baloncesto son comparables a un sistema avanzado de dirección asistida y control de estabilidad de un vehículo de alto rendimiento. Los ejercicios programados (T-Test) afinan la mecánica pura del giro (la dirección asistida), asegurando que el atleta pueda cambiar de dirección con la máxima eficiencia y potencia. Los ejercicios reactivos (agilidad abierta) integran la toma de decisiones (el GPS y el sensor de entorno) para que el atleta no solo sea rápido y potente, sino que sepa dónde, cuándo y cómo aplicar ese cambio de dirección bajo la imprevisibilidad del juego. Un buen footwork es el control de estabilidad que asegura que el "vehículo" no se despiste o sufra una lesión (falla biomecánica) al tomar una curva cerrada a alta velocidad.`,
        iconName: "Agility",
        metrics: ["Velocidad de cambio de dirección", "Tiempo en escalera"],
        exercises: [
            {
                name: "Escalera de agilidad (Ladder Drills)",
                sets: "4 series",
                reps: "Variaciones",
                rest: "45 segundos",
                description: "Para la coordinación rápida de pies.",
            },
            {
                name: "Desplazamientos defensivos (Defensive Slides)",
                sets: "3 series",
                reps: "30 segundos",
                rest: "45 segundos",
                description: "Manteniendo el centro de gravedad bajo.",
            },
            {
                name: "Pivotaje",
                sets: "3 series",
                reps: "20 repeticiones",
                rest: "30 segundos",
                description: "Ejercicios para proteger el balón y crear espacio sin pasos.",
            },
        ],
        videos: [],
    },
    mobility: {
        id: "mobility",
        title: "Movilidad y Prevención",
        description: "Salud del jugador a largo plazo",
        fullDescription: `La optimización del rendimiento y la longevidad del deportista de baloncesto dependen intrínsecamente de la movilidad articular controlada y de la implementación de programas de prevención neuromuscular (PNM) integrados en la planificación del entrenamiento. El baloncesto, siendo un deporte de alta intensidad y movimientos explosivos, presenta una incidencia lesional media-alta, concentrándose la mayoría de las lesiones en los miembros inferiores.

I. MOVILIDAD ARTICULAR: FUNDAMENTO Y ÁREAS CLAVE
La movilidad se define como la cantidad de movimiento activo que se posee, haciendo referencia al rango que la articulación es capaz de alcanzar y controlar activamente. A diferencia de la flexibilidad (el rango de movimiento que se tiene, pero sin control), una movilidad adecuada asegura la eficiencia del movimiento, mejora el rendimiento y reduce el riesgo de lesión.
Si el jugador carece de una movilidad adecuada en articulaciones clave como tobillos, caderas, columna dorsal y hombros, las articulaciones adyacentes (rodillas, espalda baja, cuello) sufrirán las consecuencias.

A. Articulaciones Críticas en el Baloncesto
1. Tobillo-Pie: Una dorsiflexión reducida del tobillo se asocia como un factor de riesgo para diversas lesiones en el miembro inferior, incluyendo lesiones del Ligamento Cruzado Anterior (LCA), esguinces de tobillo, y un mayor valgo dinámico de rodilla. El trabajo de la musculatura intrínseca del pie y la movilidad del dedo gordo son aspectos clave para la reducción de lesiones y la mejora del rendimiento.
2. Cadera y Core (Núcleo Central): La cadera es fundamental debido a la gran cantidad de movimientos de flexo-extensión, abducción-aducción y rotación. La extensión de la cadera es la más importante de la "triple extensión" (tobillo, rodilla, cadera) utilizada en saltos y carreras, y depende principalmente del glúteo e isquios.
    ◦ La "amnesia del glúteo" o la sustitución de la extensión de la cadera por la extensión lumbar es un problema común que puede causar dolor lumbar y un rendimiento pobre. El fortalecimiento de los glúteos debe ir acompañado de ejercicios de reeducación neuromuscular para asegurar que el jugador aprenda a activar el glúteo en el momento adecuado.
3. Hombro: Una movilidad adecuada del hombro, junto con un buen control escapular, es fundamental debido al volumen de contactos y la utilización de los brazos en los saltos y el lanzamiento.

II. LA PREVENCIÓN DE LESIONES: CONTEXTO Y CONTROL DE CARGA
La prevención debe ser un componente propio y fundamental dentro del programa de entrenamiento, cuyo objetivo es que los jugadores se mantengan en óptimas condiciones físicas y rindan al máximo en la mayor cantidad de partidos posible.

A. Epidemiología de Lesiones y Mecanismo
El baloncesto es un deporte con una incidencia lesional que alcanza un promedio de 9.9 lesiones por cada 1,000 horas de práctica durante los partidos. La mayoría de estas lesiones se producen en los miembros inferiores, representando más del 50% de las lesiones totales.
Los mecanismos lesionales más reseñables son:
• El origen del 56% de las lesiones viene precedido de sobrecargas, lo que sugiere un posible mal ajuste en la planificación del entrenamiento.
• Una parte relevante de las lesiones se produce en los aterrizajes (45%) y los cambios de dirección.

B. Control de la Carga de Entrenamiento
La planificación rigurosa es esencial para minimizar el riesgo, ya que tanto el exceso como el déficit en la carga de entrenamiento suponen un aumento en el riesgo de lesión.
• Índice de Foster: Es una herramienta práctica y precisa para monitorear la carga interna de entrenamiento. Se calcula multiplicando la intensidad percibida por el jugador (RPE, escala de Borg) por el volumen de la sesión (minutos).
• Umbral de Riesgo: Las unidades de carga que exceden el 70% de la carga promedio semanal incrementan la probabilidad de sufrir lesiones.

III. ESTRATEGIAS CLAVE PARA LA PREVENCIÓN NEUROMUSCULAR (PNM)
Un programa eficaz de prevención de lesiones en baloncesto debe centrarse en el entrenamiento neuromuscular. Para las jugadoras, esta necesidad se acentúa debido a factores intrínsecos como un mayor valgo de rodilla y laxitud articular.
Los programas de PNM deben basarse en cuatro pilares fundamentales:
1. Entrenamiento de Fuerza de Miembros Inferiores: Debe ser progresivo y centrado en el fortalecimiento de la cadena posterior (isquiosurales, glúteos y abductores de cadera) para equilibrar el ratio cuádriceps/isquiosurales y reducir el valgo dinámico de la rodilla.
2. Pliometría: Involucra ejercicios de alta intensidad (saltos, cortes, movimientos laterales) que mejoran la agilidad de pies, la potencia y la velocidad. Se recomienda comenzar con ejercicios de baja intensidad y aumentar gradualmente la complejidad.
3. Trabajo Central del Tronco (Core): La estabilización central del cuerpo es crucial para evitar lesiones secundarias por falta de control corporal de la extremidad inferior. Los ejercicios de tronco deben potenciar el control neuromuscular para regular las posturas y contrarrestar el movimiento del tronco.
4. Educación y Retroalimentación en el Aterrizaje: Es fundamental instruir y dar feedback sobre los patrones de aterrizaje. Un aterrizaje deficiente (rodilla cerca de la extensión o flexión menor a 45°) aumenta la tensión en el LCA.

Evaluación del Movimiento Funcional
Para individualizar los programas de prevención y corrección, es vital identificar los patrones de movimiento compensatorios o disfuncionales. El Functional Movement Screening (FMS™) es una herramienta utilizada para este fin, midiendo desbalances, rango de movilidad y estabilidad del tronco. Una puntuación de 14 o menos en el FMS™ se asocia con un aumento en la probabilidad de sufrir lesiones.

Propiocepción
El entrenamiento propioceptivo, que trabaja el sentido de la posición del cuerpo y el control neuromuscular del movimiento, ha demostrado ser la mejor estrategia costo-efectiva para la reducción significativa de esguinces de tobillo en atletas. Se sugiere utilizar ejercicios de equilibrio a una pierna con los ojos cerrados o plataformas inestables.`,
        iconName: "Mobility",
        metrics: ["Rango de movimiento", "Estabilidad"],
        exercises: [
            {
                name: "Propiocepción",
                sets: "3 series",
                reps: "30 seg por pierna",
                rest: "30 segundos",
                description: "Ejercicios de equilibrio sobre una pierna (o sobre bosu) para fortalecer tobillos y rodillas.",
            },
            {
                name: "Estiramientos dinámicos",
                sets: "1 serie",
                reps: "10 min",
                rest: "N/A",
                description: "Antes del juego (movilidad de cadera, rotaciones de tronco).",
            },
            {
                name: "Cool-down y flexibilidad estática",
                sets: "1 serie",
                reps: "15 min",
                rest: "N/A",
                description: "Post-entrenamiento para recuperación muscular.",
            },
        ],
        videos: [],
    },
    gameiq: {
        id: "gameiq",
        title: "Inteligencia de Juego",
        description: "Aspectos tácticos y lectura de juego",
        fullDescription: `La inteligencia en el juego del baloncesto, comúnmente denominada "Basketball IQ" (BBIQ), es una capacidad cognitiva esencial que, combinada con el talento físico, distingue a los jugadores promedio de la élite. Este concepto va más allá de la mera ejecución técnica; es el componente cognitivo por excelencia en el comportamiento táctico del deportista, siendo la inteligencia el factor principal que lo sustenta. Los entrenadores de alto nivel valoran enormemente a los jugadores con un alto BBIQ, ya que entienden el deporte y toman decisiones inteligentes bajo presión.

I. Definición y Componentes Centrales del BBIQ
El BBIQ se refiere a la capacidad del jugador para leer el juego, anticipar las jugadas y tomar decisiones rápidas y efectivas en tiempo real. Se entrena y se cultiva, no es una cualidad innata.

1. El Proceso Cognitivo (Percepción, Decisión y Ejecución)
El acto táctico que define el juego se descompone en tres procesos mentales secuenciales que deben ser fluidos y rápidos:
• Percepción: El jugador percibe visualmente la situación, lo cual activa el cerebro para la toma de decisiones. La calidad de esta percepción inicial es clave. Esto incluye la visión central (foco en un punto, como el aro antes de un tiro) y la visión periférica (información más amplia sin enfocar, esencial para la defensa en triángulo).
• Decisión: El jugador elige la opción más adecuada entre las alternativas disponibles para resolver el problema planteado. Este es el componente táctico definitorio.
• Ejecución: El jugador lleva a cabo el gesto técnico preciso en el momento oportuno. El dominio técnico aumenta la probabilidad de éxito de la decisión táctica.

2. Componentes Determinantes de la Inteligencia
Un jugador con alto BBIQ posee varias habilidades interrelacionadas que le permiten hacer la jugada correcta de manera consistente:
• Visión y Lectura del Juego: Es la capacidad de leer situaciones en tiempo real y anticipar las jugadas. La visión va más allá de lo evidente; incluye un "aspecto de ajedrez" donde el jugador predice cómo reaccionará el defensor para crear una apertura que aún no existe.
• Toma de Decisiones (TDD): La TDD implica elegir la opción más adecuada en una situación determinada. La TDD debería entrenarse para que el jugador obtenga un mayor número de posibilidades, seleccionando la acción en función de su estado físico y la situación de juego.
• Anticipación: Predicción de los movimientos del oponente. Los jugadores expertos son capaces de prever lo que va a suceder, moviéndose antes que sus oponentes, lo que representa una ventaja indispensable en deportes de interacción. La anticipación se logra mediante el aprendizaje de los comportamientos redundantes de los adversarios, lo que reduce la incertidumbre.
• Posicionamiento y Movimiento sin Balón: Implica saber dónde estar en la cancha en diferentes esquemas ofensivos y defensivos. Los jugadores que cortan o se mueven bien sin el balón suelen demostrar un BBIQ decente y una comprensión del juego.
• Adaptabilidad y Creatividad: Capacidad de ajustarse a situaciones cambiantes. La flexibilidad cognitiva (parte de la inteligencia) es fundamental para fomentar la creatividad y desarrollar respuestas novedosas que sorprendan a los rivales.

II. Evaluación y Desarrollo de la Inteligencia Táctica
El BBIQ no es algo que se pueda medir con una puntuación típica de test de coeficiente intelectual, ya que es un término amplio, general e intangible. Su evaluación se basa en el contexto y la observación, aunque algunas métricas objetivas pueden sugerir su presencia.

1. Métricas de Evaluación (Subjetivas y Objetivas)
La evaluación de la inteligencia de juego requiere la observación y el análisis, y se puede desglosar en IQ ofensivo y defensivo. Los componentes que se valoran comúnmente incluyen:
• Toma de decisiones: Evaluar la selección de tiros. Una baja tasa de pases erróneos o pérdidas de balón también es indicativa.
• Movimiento: La capacidad para cortar, el movimiento sin balón y el posicionamiento.
• Anticipación Defensiva: Las estadísticas de desvíos (deflections) a menudo se correlacionan con la capacidad de anticipación.
• Impacto en el Equipo: Si el rendimiento de los compañeros de equipo mejora significativamente cuando el jugador X está en la cancha, esto puede ser un buen indicador de que el jugador sabe maximizar las fortalezas de los demás.

2. Estrategias de Entrenamiento Cognitivo
El entrenamiento moderno se centra en el componente cognitivo, buscando que el jugador se convierta en el protagonista de su propio aprendizaje.
• Entrenamiento Integrado (Técnica y Táctica): La enseñanza no debe ser aislada, sino que debe buscar la combinación de la técnica con la táctica en las sesiones de práctica. La técnica debe estar presente, aunque atenuada, en todas las situaciones tácticas que se trabajen.
• Enfoque de Juego Reducido (SSG/JER): La metodología más eficaz es plantear tareas que simulen la complejidad del juego. Los juegos en espacios reducidos (JERs) son fundamentales para desarrollar el pensamiento rápido y la improvisación. Estos se pueden utilizar para potenciar la TDD, obligando a los jugadores a buscar soluciones creativas, por ejemplo, limitando el número de botes o el tiempo de tiro.
• Uso de la Incertidumbre (Agilidad Abierta): El baloncesto es inherentemente incierto, y entrenar bajo esta perspectiva potencia la inteligencia y la creatividad táctica. Se debe exponer al jugador a situaciones poco predecibles donde desconozca lo que sucederá, obligándolo a leer estímulos y probar soluciones.
• Técnicas de Enseñanza:
    ◦ Aprendizaje Explícito (Reglas "Si-Entonces"): El entrenador proporciona reglas claras (e.g., "si el defensor pasa el bloqueo por detrás, entonces lanza"). Esto es más eficaz en situaciones complejas, pero su uso excesivo puede causar "ceguera atencional", haciendo que el jugador ignore otras claves relevantes.
    ◦ Aprendizaje Implícito: Se diseñan tareas que, por sí mismas, fuerzan al deportista a tomar decisiones sin necesidad de un trabajo cognitivo previo. El jugador aprende inconscientemente a través de la experimentación y la experiencia.
• Feedback Reflexivo: El entrenador actúa como guía, utilizando preguntas (feedback interrogativo) en lugar de órdenes directas para que el jugador reflexione sobre sus acciones y encuentre la mejor solución, fomentando la autonomía y el aprendizaje significativo.

3. El Juego de Pies (Footwork) y la Agilidad como Facilitadores
La agilidad reactiva, que incluye la capacidad de análisis de un estímulo visual y una respuesta rápida, es crucial. Las habilidades de footwork (juego de pies), como la que se valora en el T-Test o en el Test de Agilidad de Illinois, son el fundamento más importante de cualquier destreza motriz, asegurando el equilibrio, la velocidad y el control. Un buen footwork en baloncesto mejora la capacidad del jugador para acelerar, cambiar de dirección rápidamente y maniobrar el balón bajo presión, lo cual es vital para la toma de decisiones efectiva.

--------------------------------------------------------------------------------
Análisis Conceptual: La Inteligencia como un Ecosistema
La inteligencia en el baloncesto puede verse como un ecosistema complejo, donde el talento físico es la tierra. Sobre esa tierra, el entrenamiento técnico siembra las semillas (los fundamentos). Pero la verdadera inteligencia de juego (BBIQ) es el clima—la capacidad constante de leer el entorno impredecible (el viento, la lluvia, el sol) y hacer la elección óptima (la decisión) en el momento justo para asegurar una cosecha exitosa (el rendimiento). Sin el BBIQ, la cosecha se arruina a pesar de la buena tierra y las semillas plantadas.`,
        iconName: "GameIQ",
        metrics: ["Posicionamiento correcto (mapas de calor)", "Decisiones acertadas"],
        exercises: [
            {
                name: "Lectura de defensa",
                sets: "Situacional",
                reps: "N/A",
                rest: "N/A",
                description: "Reconocer si es zona o individual.",
            },
            {
                name: "Espaciado (Spacing)",
                sets: "Situacional",
                reps: "N/A",
                rest: "N/A",
                description: "Saber dónde ubicarse en la cancha cuando no tienes el balón.",
            },
            {
                name: "Gestión del reloj",
                sets: "Simulación",
                reps: "5 escenarios",
                rest: "Debrifing",
                description: "Situaciones de final de partido.",
            },
        ],
        videos: [],
    },
};
