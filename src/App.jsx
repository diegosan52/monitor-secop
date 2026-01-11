import { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, AlertCircle, ExternalLink, Search, RefreshCw } from 'lucide-react';
import { fetchOpportunities } from './services/api';
import { PRIORITY_KEYWORDS } from './config';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    const results = await fetchOpportunities();

    // Process Data (Calculate Priority) Client-Side
    const processed = results.map(item => {
      const desc = (item.descripci_n_del_procedimiento || '').toLowerCase();
      const isHighPriority = PRIORITY_KEYWORDS.some(k => desc.includes(k.toLowerCase()));

      return {
        ...item,
        isHighPriority,
        formattedValue: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.precio_base || 0)
      };
    });

    // Sort: High Priority first
    processed.sort((a, b) => (b.isHighPriority ? 1 : 0) - (a.isHighPriority ? 1 : 0));

    setData(processed);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = data.filter(item =>
    item.descripci_n_del_procedimiento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.entidad?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highPriorityCount = data.filter(d => d.isHighPriority).length;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div>
          <h1 className="title-gradient" style={{ margin: 0, fontSize: '2rem' }}>SECOP II Monitor</h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>ATG Ltda - Inteligencia de Negocios</p>
        </div>
        <button className="btn-link" onClick={loadData}>
          <RefreshCw size={18} /> Actualizar
        </button>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="glass-card">
          <div className="stat-value">{data.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <LayoutDashboard size={16} /> Procesos Activos
          </div>
        </div>
        <div className="glass-card">
          <div className="stat-value" style={{ color: '#ec4899' }}>{highPriorityCount}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <TrendingUp size={16} /> Alta Prioridad
          </div>
        </div>
      </div>

      {/* High Priority Alerts */}
      {highPriorityCount > 0 && (
        <section className="priority-section">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <AlertCircle color="#ec4899" /> Oportunidades Destacadas
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {data.filter(d => d.isHighPriority).map((item, idx) => (
              <div key={idx} className="glass-card" style={{ borderLeft: '4px solid #ec4899' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.descripci_n_del_procedimiento}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                      {item.entidad} • {item.formattedValue} • Cierre: {item.fecha_de_publicacion_del?.split('T')[0]}
                    </p>
                  </div>
                  <a
                    href={item.urlproceso?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    style={{ background: 'var(--primary)' }}
                  >
                    Ver Proceso <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Table */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Todos los Procesos</h2>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Buscar entidad u objeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--glass-border)',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                width: '300px'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="loader"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Prioridad</th>
                  <th>Entidad</th>
                  <th>Objeto</th>
                  <th>Valor</th>
                  <th>Fecha Pub.</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`badge ${item.isHighPriority ? 'badge-high' : 'badge-normal'}`}>
                        {item.isHighPriority ? 'ALTA' : 'Normal'}
                      </span>
                    </td>
                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.entidad}</td>
                    <td style={{ maxWidth: '300px', whiteSpace: 'normal' }}>
                      {item.descripci_n_del_procedimiento}
                    </td>
                    <td>{item.formattedValue}</td>
                    <td>{item.fecha_de_publicacion_del?.split('T')[0]}</td>
                    <td>
                      <a
                        href={item.urlproceso?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
