import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  _id: string;
  address: {
    city: string;
    zipCode: string;

  };
  email: string;
}

const UserListModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/showusers');
          const data = await response.json();
          if (response.ok) {
            setUsers(data);
          } else {
            setError(data.message || 'Erro ao buscar usuários');
          }
        } catch (error) {
          setError('Erro na conexão com o servidor');
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Lista de Usuários</h2>
        
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className='text-black'>
            {users.map((user) => (
              <li key={user._id}>
                EMAIL: {user.email}
                <br />
                CIDADE: {user.address.city}
                <br />
                CEP: {user.address.zipCode}
                <br />
                --------------------

              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded justify-center"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default UserListModal;
