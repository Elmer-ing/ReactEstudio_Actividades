import { useEffect, useState } from 'react';
import './CurrencyConverter.css';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener lista de monedas al cargar
  useEffect(() => {
    setLoading(true);
    fetch('https://api.frankfurter.app/currencies')
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.keys(data));
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar monedas.');
        setLoading(false);
      });
  }, []);

  const handleConvert = () => {
    if (from === to) {
      setError('Selecciona dos monedas diferentes.');
      setResult(null);
      return;
    }
    
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(res => res.json())
      .then(data => {
        setResult(data.rates[to]);
        setError('');
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener la tasa de cambio.');
        setResult(null);
        setLoading(false);
      });
  };

  return (
    <div className="conversor">
      <h2 className="conversor__titulo">Conversor de Divisas</h2>
      
      <div className="conversor__formulario">
        <div className="conversor__grupo-campo">
          <label htmlFor="cantidad" className="conversor__etiqueta">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="conversor__entrada"
            placeholder="Ingresa la cantidad"
          />
        </div>
        
        <div className="conversor__contenedor-selects">
          <div className="conversor__grupo-campo">
            <label htmlFor="moneda-origen" className="conversor__etiqueta">De</label>
            <select
              id="moneda-origen"
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="conversor__select"
              disabled={loading || currencies.length === 0}
            >
              {currencies.map(cur => (
                <option key={`from-${cur}`} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
          
          <div className="conversor__icono-cambio">↔️</div>
          
          <div className="conversor__grupo-campo">
            <label htmlFor="moneda-destino" className="conversor__etiqueta">A</label>
            <select
              id="moneda-destino"
              value={to}
              onChange={e => setTo(e.target.value)}
              className="conversor__select"
              disabled={loading || currencies.length === 0}
            >
              {currencies.map(cur => (
                <option key={`to-${cur}`} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleConvert} 
          className="conversor__boton"
          disabled={loading}
        >
          {loading ? 'Calculando...' : 'Convertir'}
        </button>
      </div>
      
      {error && (
        <div className="conversor__error">
          <span className="conversor__icono-error">⚠️</span> 
          {error}
        </div>
      )}
      
      {result && (
        <div className="conversor__resultado">
          <div className="conversor__icono-resultado">💱</div>
          <div className="conversor__texto-resultado">
            <span className="conversor__valor-origen">{amount} {from}</span>
            <span className="conversor__simbolo-igual">=</span>
            <span className="conversor__valor-destino">{result.toFixed(2)} {to}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;