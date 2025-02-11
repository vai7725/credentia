'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { USER_ROLE } from '@prisma/client';

type JobPostProps = {
  id?: string;
  title?: string;
  description?: string;
  company?: string;
  location?: string;
  salary?: number;
};

export const getAllJobs = async () => {
  try {
    //get all  listed job without login
    const data = await client.jobPost.findMany();

    if (!data) {
      return { status: 404, data: 'Job Data not found' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getJob = async (id: string) => {
  try {
    //get listed job without login using job id
    const data = await client.jobPost.findUnique({
      where: { id: id },
    });

    if (!data) {
      return { status: 404, data: 'Job data not found' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const createJob = async (data: JobPostProps) => {
  try {
    // check user login or not
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!userData) {
      return { status: 404, data: 'User data not found' };
    }

    if (userData.role != USER_ROLE.ADMIN || USER_ROLE.COMPANY) {
      return { status: 403, data: 'Access denied' };
    }

    // create job if user is company or admin
    if (userData.role == USER_ROLE.ADMIN || USER_ROLE.COMPANY) {
      await client.jobPost.create({
        data: {
          title: data.title!,
          description: data.description!,
          company: data.company!,
          location: data.location,
          salary: data.salary,
        },
      });
    }

    return { status: 200, data: 'Job post created successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const updateJob = async (data: JobPostProps) => {
  try {
    // check user login or not
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!userData) {
      return { status: 404, data: 'User data not found' };
    }

    if (userData.role != USER_ROLE.ADMIN || USER_ROLE.COMPANY) {
      return { status: 403, data: 'Access denied' };
    }

    // update job data acouding to job belwon to company or admin
    let jobData;
    if (userData.role == USER_ROLE.COMPANY) {
      jobData = await client.jobPost.findUnique({
        where: {
          id: data.id,
          userId: userData.id,
        },
      });

      if (!jobData) {
        return { status: 403, data: 'Access denied' };
      }
    }

    if (userData.role == USER_ROLE.ADMIN) {
      jobData = await client.jobPost.findUnique({
        where: { id: data.id },
      });

      if (!jobData) {
        return { status: 404, data: 'Job data not found' };
      }
    }

    await client.jobPost.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        salary: data.salary,
        company: data.company,
        location: data.location,
      },
    });

    return { status: 200, data: 'Job data updated successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const deleteJob = async (data: JobPostProps) => {
  try {
    // check user login or not
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const userData = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!userData) {
      return { status: 404, data: 'User data not found' };
    }

    if (userData.role != USER_ROLE.ADMIN || USER_ROLE.COMPANY) {
      return { status: 403, data: 'Access denied' };
    }

    const jobData = await client.jobPost.findUnique({
      where: { id: data.id },
    });

    if (!jobData) {
      return { status: 404, data: 'Job data not found' };
    }

    // delete job accouding to job owner, admin or company
    if (userData.role === USER_ROLE.COMPANY) {
      const deletedData = await client.jobPost.delete({
        where: {
          id: data.id,
          userId: userData.id,
        },
      });

      if (!deletedData) {
        return { status: 500, data: 'Something worng' };
      }
    }

    if (userData.role === USER_ROLE.ADMIN) {
      const deletedData = await client.jobPost.delete({
        where: {
          id: data.id,
        },
      });

      if (!deletedData) {
        return { status: 500, data: 'Something worng' };
      }
    }

    return { status: 200, data: 'Job post deleted successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
