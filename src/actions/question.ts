'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { USER_ROLE } from '@prisma/client';
import { stat } from 'fs';
import { text } from 'stream/consumers';

export const getAllQuestions = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // get all questions of a paper
    const data = await client.paper.findUnique({
      where: { id: id },
      include: {
        questions: true,
        userAttempt: true,
      },
    });

    if (!data) {
      return { status: 404, data: 'Questions not found in this paper' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getQuestion = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // get question using id with questions
    const data = await client.question.findUnique({
      where: { id: id },
    });

    if (!data) {
      return { status: 404, data: 'Question not found' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server errror' };
  }
};

export const createQuestion = async (
  paperId: string,
  text: string,
  difficulty: string
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

    // if admin create question in existing paper
    if (userData.role === USER_ROLE.ADMIN) {
      await client.paper.update({
        where: { id: paperId },
        data: {
          questions: {
            create: {
              text: text,
              difficulty: difficulty,
            },
          },
        },
      });
    }

    return { status: 201, data: 'New Question create successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const updateQuestion = async (
  id: string,
  text: string,
  difficulty: string,
  correctId: string
) => {
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

    if (userData.role === USER_ROLE.CANDIDATE || USER_ROLE.NULL) {
      return { status: 403, data: 'Access denied' };
    }

    // if admin update question using id in existing paper
    if (userData.role === USER_ROLE.COMPANY) {
      await client.question.update({
        where: {
          id: id,
          paper: { company: userData.companyDetails?.companyName },
        },
        data: {
          text: text,
          difficulty: difficulty,
          correctId: correctId,
        },
      });
    }

    if (userData.role === USER_ROLE.ADMIN) {
      await client.question.update({
        where: {
          id: id,
        },
        data: {
          text: text,
          difficulty: difficulty,
          correctId: correctId,
        },
      });
    }

    return { status: 200, data: 'Question updated successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    // check user is admin or company or not
    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
      include: { companyDetails: true },
    });

    if (!userData) {
      return { status: 404, data: 'User data not found' };
    }

    if (userData.role === USER_ROLE.NULL || USER_ROLE.CANDIDATE) {
      return { status: 403, data: 'Access denied' };
    }

    // if admin/company then delete question of a paper
    if (userData.role === USER_ROLE.ADMIN) {
      await client.question.delete({
        where: { id: id },
      });
    }

    if (userData.role === USER_ROLE.COMPANY) {
      await client.question.delete({
        where: {
          id: id,
          paper: {
            company: userData.companyDetails?.companyName,
          },
        },
      });
    }

    return { status: 200, data: 'Question deleted successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
