
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    

    return NextResponse.json({ message: 'Conectado ao MongoDB com sucesso!' });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    
    return NextResponse.json({ message: 'Falha na conexão com o MongoDB', error: (error as Error).message }, { status: 500 });
  }
}
