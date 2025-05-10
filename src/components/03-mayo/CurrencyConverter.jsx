import { useEffect, useState } from 'react';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Obtener lista de monedas al cargar
  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(res => res.json())
      .then(data => setCurrencies(Object.keys(data)))
      .catch(() => setError('Error al cargar monedas.'));
  }, []);

  const handleConvert = () => {
    if (from === to) {
      setError('Selecciona dos monedas diferentes.');
      setResult(null);
      return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(res => res.json())
      .then(data => {
        setResult(data.rates[to]);
        setError('');
      })
      .catch(() => {
        setError('Error al obtener la tasa de cambio.');
        setResult(null);
      });
  };

  return (
    <div style={{ maxWidth: '400px', padding: '1rem' }}>
      <h2>Conversor de divisas</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select value={from} onChange={e => setFrom(e.target.value)} style={{ flex: 1 }}>
            {currencies.map(cur => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
          <select value={to} onChange={e => setTo(e.target.value)} style={{ flex: 1 }}>
            {currencies.map(cur => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleConvert} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Convertir
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      {result && (
        <p>
          💱 {amount} {from} = <strong>{result.toFixed(2)} {to}</strong>
        </p>
      )}
    </div>
  );
}

export default CurrencyConverter;