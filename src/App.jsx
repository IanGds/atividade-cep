import React, { useState } from 'react';

function App() {
  // 1. Criamos o Estado para guardar as informações do formulário
  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    uf: '',
    localidade: '' // No ViaCEP, a cidade se chama 'localidade'
  });

  // 2. Função para buscar o CEP na API
  const buscarCep = async (cepBuscado) => {
    // Tira qualquer coisa que não seja número (ex: o traço do CEP)
    const cepLimpo = cepBuscado.replace(/\D/g, ''); 

    // Verifica se tem 8 números. Se não tiver, nem faz a requisição.
    if (cepLimpo.length !== 8) {
      return; 
    }

    try {
      // Faz a requisição HTTP para o ViaCEP
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json();

      // Se o CEP existir (não retornar erro), atualizamos o Estado
      if (!dados.erro) {
        setEndereco((estadoAnterior) => ({
          ...estadoAnterior, // Mantém o que já estava lá (como o 'numero' que o usuário já digitou)
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

  // 3. Função para lidar com a digitação nos campos
  const manipularMudanca = (evento) => {
    // Pega o nome do campo e o valor que acabou de ser digitado
    const { name, value } = evento.target;

    // Atualiza o Estado
    setEndereco({
      ...endereco,
      [name]: value
    });

    // Se o campo que o usuário está digitando for o CEP e tiver 8 números, dispara a busca automaticamente
    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      buscarCep(value);
    }
  };

  // 4. A interface (JSX) - Estrutura parecida com a sua Figura 1
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