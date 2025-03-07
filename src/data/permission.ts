export const userPermissions = [
  {
    module: "Dashboard",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Contacts",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Lead",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Loan",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
      updateStatus:true,
    },
  },
  {
    module: "Manage Billing",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
      view: true,
    },
  },
  {
    module: "Manage Orders",
    access: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Newsletter",
    access: {
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Testimonials",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Blogs",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
    },
  },
];
