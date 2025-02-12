'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { APPLICATION_STATUS, USER_ROLE } from '@prisma/client';

type ApplicationProps = {
  id?: string;
  jobPostId?: string;
  userId?: string;
  status?: APPLICATION_STATUS;
};

export const getAllApplications = async () => {
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

    if (
      userData.role != USER_ROLE.CANDIDATE ||
      USER_ROLE.COMPANY ||
      USER_ROLE.ADMIN
    ) {
      return { status: 403, data: 'Access denied' };
    }

    // if user login and user role is company and admin then show all data using job id
    let data;
    if (userData.role === USER_ROLE.ADMIN) {
      data = await client.application.findMany();

      if (!data) {
        return { status: 404, data: 'Applications data not found' };
      }
    }

    if (userData.role === USER_ROLE.COMPANY) {
      data = await client.application.findMany({
        where: {
          jobPost: {
            userId: userData.id,
          },
        },
      });

      if (!data) {
        return { status: 404, data: 'Applications data not found' };
      }
    }

    // if user role is candidate then show all application of they apply
    if (userData.role === USER_ROLE.CANDIDATE) {
      data = await client.application.findMany({
        where: {
          userId: userData.id,
        },
      });

      if (!data) {
        return { status: 404, data: 'Applications data not found' };
      }
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getApplication = async (data: ApplicationProps) => {
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

    // if admin then give data using id
    let applicationData;
    if (userData.role === USER_ROLE.ADMIN) {
      applicationData = await client.application.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!applicationData) {
        return { status: 404, data: 'Application Data not found' };
      }
    }

    // if company then give only company's job's application data using id
    if (userData.role === USER_ROLE.COMPANY) {
      applicationData = await client.application.findUnique({
        where: {
          id: data.id,
          jobPost: {
            userId: userData.id,
          },
        },
      });

      if (!applicationData) {
        return { status: 404, data: 'Application data not found' };
      }
    }

    // if candidate then give only there application data based on id
    if (userData.role === USER_ROLE.CANDIDATE) {
      applicationData = await client.application.findUnique({
        where: {
          userId: userData.id,
        },
      });

      if (!applicationData) {
        return { status: 404, data: 'Application data not found' };
      }
    }

    return { status: 200, data: applicationData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const createApplication = async (data: ApplicationProps) => {
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

    // if user role is - candidate , admin then apply for application only
    if (userData.role !== USER_ROLE.ADMIN || USER_ROLE.CANDIDATE) {
      return { status: 403, data: 'Access denied' };
    }

    const applicationData = await client.application.create({
      data: {
        jobPostId: data.jobPostId,
        userId: userData.id,
      },
    });

    if (!applicationData) {
      return { status: 500, data: 'Something went worng' };
    }

    return { status: 200, data: applicationData };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const updateApplication = async (data: ApplicationProps) => {
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

    if (userData.role !== USER_ROLE.COMPANY || USER_ROLE.ADMIN) {
      return { status: 403, data: 'Access denied' };
    }

    // if user role = company and admin than update based on id and data
    if (userData.role === USER_ROLE.COMPANY) {
      await client.application.update({
        where: {
          id: data.id,
          jobPost: {
            userId: userData.id,
          },
        },
        data: {
          status: data.status,
        },
      });
    }

    if (userData.role === USER_ROLE.ADMIN) {
      await client.application.update({
        where: {
          id: data.id,
        },
        data: {
          status: data.status,
        },
      });
    }

    return { status: 200, data: 'Application status updated successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const deleteApplication = async (data: ApplicationProps) => {
  try {
    // check login or not
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

    if (
      userData.role !== USER_ROLE.ADMIN ||
      USER_ROLE.CANDIDATE ||
      USER_ROLE.COMPANY
    ) {
      return { status: 403, data: 'Access denied' };
    }

    // if user role = candidate, company , admin delete application accoundig to there parmistion
    if (userData.role === USER_ROLE.ADMIN) {
      await client.application.delete({
        where: {
          id: data.id,
        },
      });
    }

    if (userData.role === USER_ROLE.COMPANY) {
      await client.application.delete({
        where: {
          id: data.id,
          jobPost: {
            userId: userData.id,
          },
        },
      });
    }

    if (userData.role === USER_ROLE.CANDIDATE) {
      await client.application.delete({
        where: {
          id: data.id,
          userId: userData.id,
        },
      });
    }

    return { status: 200, data: 'Application deleted successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
