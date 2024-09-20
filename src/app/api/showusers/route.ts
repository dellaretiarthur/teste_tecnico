import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
    await connectToDatabase();
    
    try {
        const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
            email: String,
            password: String,
        }));
        const users = await User.find();
        return NextResponse.json(users);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
    }





}
