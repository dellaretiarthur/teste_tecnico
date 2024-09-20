import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'Chave_super_secreta';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectToDatabase();
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const isPasswordValid = user.password ? bcrypt.compareSync(password, user.password) : false;
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Senha inválida' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );


    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      token,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
