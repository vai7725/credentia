'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { USER_ROLE } from '@prisma/client';

export const getAllPapers = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // get app paper
    const data = await client.paper.findMany({
      include: {
        questions: true,
      },
    });

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getPaper = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // get paper using id with questions
    const data = await client.paper.findUnique({
      where: { id: id },
    });

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server errror' };
  }
};

export const createPaper = async (title: string, company: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // check user is admin or company or not
    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!userData) {
      return { status: 404, data: 'Login user data not found' };
    }

    if (userData.role != USER_ROLE.ADMIN || USER_ROLE.COMPANY) {
      return { status: 403, data: 'Access denied' };
    }

    // if admin create paper
    if (userData.role === USER_ROLE.ADMIN) {
      await client.paper.create({
        data: {
          title: title,
          company: company,
        },
      });
    }

    // if company create paper and send to aprovel
    if (userData.role === USER_ROLE.COMPANY) {
      await client.paper.create({
        data: {
          title: title,
          company: company,
          approve: false,
        },
      });
    }

    return { status: 201, data: 'Paper Created' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const updatePaper = async (
  id: string,
  title: string,
  company: string,
  aprovel: boolean
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // check user is admin or company or not
    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!userData) {
      return { status: 404, data: 'User data not found' };
    }

    if (userData.role === USER_ROLE.NULL || USER_ROLE.CANDIDATE) {
      return { status: 403, data: 'Access denied' };
    }

    await client.paper.update({
      where: { id: id },
      data: {
        title: title,
        company: company,
        approve: aprovel,
      },
    });

    return { status: 200, data: 'Paper update successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const deletePaper = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // check user is admin or company or not
    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
      include: {
        companyDetails: true,
      },
    });

    if (!userData) {
      return { status: 404, data: 'User data not found' };
    }

    if (userData.role === USER_ROLE.NULL || USER_ROLE.CANDIDATE) {
      return { status: 403, data: 'Access denied' };
    }

    // if company then delete only company  paper
    if (userData.role === USER_ROLE.COMPANY) {
      await client.paper.delete({
        where: {
          id: id,
          company: userData.companyDetails?.companyName,
        },
      });
    }

    // if admin/company then delete paper
    if (userData.role === USER_ROLE.ADMIN) {
      await client.paper.delete({
        where: {
          id: id,
        },
      });
    }

    return { status: 200, data: 'Paper deleted successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
