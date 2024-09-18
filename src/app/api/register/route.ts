import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/Users';
import { getAddressByCep } from '@/lib/cep';
import * as z from 'zod';

const registerSchema = z.object({
  email: z.string().email('Email inválido ou já utilizado').min(1, 'Campo obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  cep: z.string().length(8, 'CEP inválido'),
});

export async function POST(request: Request) {
  try {
    const { email, password, cep } = await request.json();
    registerSchema.parse({ email, password, cep });

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Usuário já existe' }, { status: 400 });
    }

    const address = await getAddressByCep(cep);


    const newUser = new User({
      email,
      password,
      address,
    });
    await newUser.save();

    return NextResponse.json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json({ message: 'Erro ao registrar usuário', error: error.message }, { status: 500 });
  }
}
