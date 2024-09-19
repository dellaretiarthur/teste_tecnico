import Link from 'next/link';


export default function page() {
  return (
    <>
      <div className="flex justify-around flex-row items-center w-screen h-screen min-h-screen overflow-hidden ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Bem vindo ao sistema de gerenciamento de usuários</h1>
          <p className="text-lg">É simples e gratuito! Experimente agora!</p>
          <a href="/pages/login" className=" text-black bg-blue-100  font-medium py-1 px-3 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 active:scale-95">Já tem uma conta?</a>
        </div>
        <Link href="/pages/register" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 active:scale-95">Crie uma conta grátis!</Link>   


      </div>
      
    </>
  );
}