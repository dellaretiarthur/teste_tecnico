
'use client';

import { useState } from 'react';
import { getAddressByCep } from '@/lib/cep'; 
import Link from 'next/link';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) { 
      try {
        const addressData = await getAddressByCep(cepValue);
        setAddress(addressData);
        setError(''); 
      } catch (err) {
        setAddress({
          street: '',
          city: '',
          state: '',
          zipCode: '',
        });
        setError('CEP não encontrado');
      }
    } else {
      setAddress({
        street: '',
        city: '',
        state: '',
        zipCode: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Email inválido');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (cep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, cep, address }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setError('');
      } else {
        setMessage('');
        setError(result.message);
      }
    } catch (err) {
      setMessage('');
      setError('Erro na conexão com o servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="cep" className="block text-gray-700 font-semibold mb-1">CEP</label>
            <input
              id="cep"
              type="text"
              value={cep}
              onChange={handleCepChange}
              placeholder="Digite seu CEP"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="street" className="block text-gray-700 font-semibold mb-1">Rua</label>
            <input
              id="street"
              type="text"
              value={address.street}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 font-semibold mb-1">Cidade</label>
            <input
              id="city"
              type="text"
              value={address.city}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 font-semibold mb-1">Estado</label>
            <input
              id="state"
              type="text"
              value={address.state}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
          <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/pages/login" className="text-blue-500 hover:text-blue-700 font-semibold">
              Login
            </a>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            voltar para início?{' '}
            <a href="/" className="text-blue-500 hover:text-blue-700 font-semibold">
              Início
            </a>
          </p>
        </div>

        </form>
        {message && <p className="mt-4 text-center text-green-700">{message}</p>}
        {error && <p className="mt-4 text-center text-red-700">{error}</p>}
      </div>
    </div>
  );
}
