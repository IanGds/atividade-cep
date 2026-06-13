import React, { useState } from 'react';

function App() {
  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    uf: '',
    localidade: ''
  });

  const buscarCep = async (cepBuscado) => {
    const cepLimpo = cepBuscado.replace(/\D/g, ''); 

    if (cepLimpo.length !== 8) {
      return; 
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json();

      if (!dados.erro) {
        setEndereco((estadoAnterior) => ({
          ...estadoAnterior,
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          uf: dados.uf,
          localidade: dados.localidade
        }));
      } else {
        alert("CEP não encontrado!");
      }
    } catch (erro) {
      console.error("Erro ao buscar o CEP:", erro);
    }
  };

  const manipularMudanca = (evento) => {
    const { name, value } = evento.target;

    setEndereco({
      ...endereco,
      [name]: value
    });

    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      buscarCep(value);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Address</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          name="cep" 
          placeholder="CEP (ex: 01001-000)" 
          value={endereco.cep} 
          onChange={manipularMudanca} 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" 
          name="logradouro" 
          placeholder="Rua / Avenida" 
          value={endereco.logradouro} 
          onChange={manipularMudanca} 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" 
          name="numero" 
          placeholder="Número" 
          value={endereco.numero} 
          onChange={manipularMudanca} 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" 
          name="bairro" 
          placeholder="Bairro" 
          value={endereco.bairro} 
          onChange={manipularMudanca} 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" 
          name="uf" 
          placeholder="Estado (UF)" 
          value={endereco.uf} 
          onChange={manipularMudanca} 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" 
          name="localidade" 
          placeholder="Cidade" 
          value={endereco.localidade} 
          onChange={manipularMudanca} 
          style={{ padding: '10px' }}
        />
      </div>
    </div>
  );
}

export default App;