import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const items = await prisma.user.findMany();
  return NextResponse.json(items);
}

export async function POST(request) {
  const data = await request.json();
  const item = await prisma.user.create({ data });
  return NextResponse.json(item);
}
