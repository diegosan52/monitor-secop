// Configuración para el Web Viewer
// Misma lógica que el agente backend

export const API_ENDPOINT = 'https://www.datos.gov.co/resource/p6dx-8zbt.json';

// Códigos UNSPSC con prefijo V1 como requiere el dataset
export const TARGET_UNSPSC_CODES = [
    'V1.81101504', // Ingeniería geológica
    'V1.81101516', // Geofísica
    'V1.81101517', // Hidrogeología
    'V1.81101518', // Geotecnia
    'V1.70111508', // Perforación de pozos
    'V1.81101500',
];

export const PRIORITY_KEYWORDS = [
    'estudio de aguas subterráneas',
    'estabilidad de taludes',
    'sísmica de refracción',
    'cartografía geológica',
    'geología',
    'geofísica',
    'hidrogeología',
    'pozos profundos'
];

export const TARGET_STATUSES = [
    'Presentación de oferta',
    'Evaluación',
    'Abierto'
];

export const API_FIELDS = [
    'entidad',
    'referencia_del_proceso',
    'descripci_n_del_procedimiento', // Objeto
    'fecha_de_publicacion_del',      // Fecha Pub
    'precio_base',                   // Valor
    'estado_del_procedimiento',      // Estado
    'urlproceso',                    // Link (Object)
    'codigo_principal_de_categoria'  // UNSPSC
];
