import axios from 'axios';
import { API_ENDPOINT, API_FIELDS, TARGET_STATUSES, TARGET_UNSPSC_CODES } from '../config';

export const fetchOpportunities = async () => {
    // Construir Query SoQL
    const select = `$select=${API_FIELDS.join(',')}`;

    const unspscList = TARGET_UNSPSC_CODES.map(c => `'${c}'`).join(',');
    const whereUnspsc = `codigo_principal_de_categoria IN (${unspscList})`;

    const statusList = TARGET_STATUSES.map(s => `'${s}'`).join(',');
    const whereStatus = `estado_del_procedimiento IN (${statusList})`;

    const nowIso = new Date();
    nowIso.setDate(nowIso.getDate() - 60);
    const dateStr = nowIso.toISOString().split('.')[0];
    const whereDate = `fecha_de_publicacion_del > '${dateStr}'`;

    // Combinar filtros
    const where = `$where=${whereUnspsc} AND ${whereStatus} AND ${whereDate}`;
    const limit = '$limit=2000';
    const order = '$order=fecha_de_publicacion_del DESC';

    const queryUrl = `${API_ENDPOINT}?${select}&${where}&${limit}&${order}`;

    try {
        const response = await axios.get(queryUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
