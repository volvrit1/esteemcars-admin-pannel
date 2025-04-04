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
    module: "Manage Call",
    access: {
      read: true,
      // create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Leads",
    access: {
      read: true,
      // create: true,
      update: true,
      delete: true,
      updateLeadsStatus: true,
      chat: true,
    },
  },
  {
    module: "Manage Leads Status",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
      updateLeadsStatus: true,
      chat: true,
    },
  },
  {
    module: "Manage Loan",
    access: {
      read: true,
      update: true,
      delete: true,
      updateStatus: true,
    },
  },
  {
    module: "Manage Users",
    access: {
      // create: true,
      read: true,
      // update: true,
      delete: true,
    },
  },
  {
    module: "Manage Loan Status",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
      updateStatus: true,
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
  {
    module: "Manage Faqs",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Banners",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  {
    module: "Manage Sections",
    access: {
      read: true,
      write: true,
      create: true,
      update: true,
      delete: true,
    },
  },
];
