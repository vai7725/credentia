'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
    });

    if (userExist) {
      return { status: 200, data: userExist };
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        userImage: user.imageUrl,
      },
    });

    if (newUser) {
      return { status: 201, data: newUser };
    }

    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
