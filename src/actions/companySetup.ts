'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const saveSetupCompanyData01 = async (data: {
  companyName: string;
  industry: string;
  companySize: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    await client.user.update({
      where: { clerkid: user.id },
      data: {
        activePage: { increment: 1 },
        companyDetails: {
          update: {
            companyName: data?.companyName,
            industry: data?.industry,
            companySize: data?.companySize,
          },
        },
      },
    });

    return {
      status: 200,
      data: 'Company details updated successfully',
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const saveSetupCompanyData02 = async (data: {
  foundedYear: string;
  companyDescription: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    await client.user.update({
      where: { clerkid: user.id },
      data: {
        activePage: { increment: 1 },
        companyDetails: {
          update: {
            foundedYear: data?.foundedYear,
            companyDescription: data?.companyDescription,
          },
        },
      },
    });

    return {
      status: 200,
      data: 'Company details updated successfully',
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const saveSetupCompanyData03 = async (data: {
  address: string;
  city: string;
  country: string;
  website: string;
  contactEmail: string;
  phoneNumber: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    await client.user.update({
      where: { clerkid: user.id },
      data: {
        activePage: { increment: 1 },
        companyDetails: {
          update: {
            companyAddress: data?.address,
            companyAddressCity: data?.city,
            companyAddressCountry: data?.country,
            companyWebsite: data?.website,
            companyEmail: data?.contactEmail,
            companyPhone: data?.phoneNumber,
          },
        },
      },
    });

    return {
      status: 200,
      data: 'Company details updated successfully',
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const saveSetupCompanyData04 = async (data: {
  linkedIn: string;
  missionStatement: string;
  coreValues: string;
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    await client.user.update({
      where: { clerkid: user.id },
      data: {
        activePage: { increment: 1 },
        isProfileComplete: true,
        companyDetails: {
          update: {
            linkedIn: data?.linkedIn,
            companyMissionStatement: data?.missionStatement,
            companyCoreValues: data?.coreValues,
          },
        },
      },
    });

    return {
      status: 200,
      data: 'Company details updated successfully',
    };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
