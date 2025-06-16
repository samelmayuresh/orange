'use server';

import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

export async function addToCart(formData) {
  try {
    const category = formData.get('category');
    const quantity = formData.get('quantity'); // keep as string
    const paymentType = formData.get('paymentType');
    const payment = formData.get('payment');

    if (!category || !quantity || !paymentType || !payment) {
      return { success: false, message: 'All fields are required.' };
    }

    await prisma.user.create({
      data: {
        category,
        quantity,
        paymentType,
        payment,
      },
    });

    console.log('📦 Adding to user:', {
      category,
      quantity,
      paymentType,
      payment,
    });

    return { success: true, message: 'Item added to user table!' };
  } catch (error) {
    console.error('❌ Error adding to user table:', error);
    return { success: false, message: 'Failed to add to user table.' };
  }
}
