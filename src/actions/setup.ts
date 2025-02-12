'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { USER_ROLE } from '@prisma/client';

export const onSaveWhoData = async (who: string) => {
  try {
    if (!who || who == '') {
      return { status: 400, data: 'Invalid or missing role' };
    }

    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.update({
      where: { clerkid: user.id },
      data: {
        role: who as USER_ROLE,
        activePage: { increment: 1 },
      },
    });

    console.log(data);

    return {
      status: 200,
      data: 'Role updated successfully',
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const isSetupComplete = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        isProfileComplete: true,
        activePage: true,
        role: true,
      },
    });

    if (!data) {
      return { status: 404, data: 'data not found in db' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const resetSetup = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    await client.user.update({
      where: { clerkid: user.id },
      data: {
        isProfileComplete: false,
        activePage: 0,
        role: USER_ROLE.NULL,
      },
    });

    return { status: 200, data: 'Reset setup successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
