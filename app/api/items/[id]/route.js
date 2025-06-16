import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
  const { id } = params;
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const updated = await prisma.user.update({
    where: { id },
    data,
  });
  return NextResponse.json(updated);
}
